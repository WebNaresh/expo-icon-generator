/**
 * Sends changelog email to all newsletter subscribers after a release.
 * Reads subscribers from Neon PostgreSQL via @neondatabase/serverless.
 * Sends via Gmail using existing nodemailer credentials.
 *
 * Required env vars:
 *   NEXT_GMAIL_USER      — Gmail address (already used for feedback emails)
 *   NEXT_GMAIL_PASSWORD  — Gmail app password (already used for feedback emails)
 *   RELEASE_VERSION      — set from release job output (e.g. "1.3.0")
 *   DATABASE_URL         — Neon connection string
 */

import { createTransport } from "nodemailer";
import { readFileSync } from "fs"; // still used for CHANGELOG.md
import { neon } from "@neondatabase/serverless";

const {
  NEXT_GMAIL_USER,
  NEXT_GMAIL_PASSWORD,
  RELEASE_VERSION,
  DATABASE_URL,
} = process.env;

if (!NEXT_GMAIL_USER || !NEXT_GMAIL_PASSWORD) {
  console.error("Missing NEXT_GMAIL_USER or NEXT_GMAIL_PASSWORD");
  process.exit(1);
}

// ── Read subscribers from Neon database ───────────────────────────────────
async function getSubscribers() {
  if (!DATABASE_URL) {
    console.log("No DATABASE_URL — skipping subscriber fetch.");
    return [];
  }
  try {
    const sql = neon(DATABASE_URL);
    const rows = await sql`SELECT email FROM "Subscriber"`;
    return rows.map((r) => r.email);
  } catch (err) {
    console.log("Failed to fetch subscribers:", err.message);
    return [];
  }
}

// ── Parse latest CHANGELOG.md section ─────────────────────────────────────
function parseLatestChangelog() {
  try {
    const content = readFileSync("CHANGELOG.md", "utf-8");
    const parts = content.split(/\n(?=# \[|## \[)/);
    const latest = parts.find((s) => s.startsWith("# [") || s.startsWith("## ["));

    if (!latest) {
      return { version: RELEASE_VERSION ?? "new", body: "A new release is available." };
    }

    const match = latest.match(/^#{1,2} \[([^\]]+)\]/);
    const version = match ? match[1] : (RELEASE_VERSION ?? "new");
    const body = latest.split("\n").slice(1).join("\n").trim();

    return { version, body };
  } catch {
    return {
      version: RELEASE_VERSION ?? "new",
      body: "A new version of Expo Icon Generator has been released.",
    };
  }
}

// ── Convert minimal markdown to HTML ──────────────────────────────────────
function markdownToHtml(md) {
  return md
    .replace(/^### (.+)$/gm, "<h3 style='color:#fff;margin:16px 0 8px'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 style='color:#fff;margin:20px 0 10px'>$1</h2>")
    .replace(/^\* (.+)$/gm, "<li style='color:#d1d5db;margin:4px 0'>$1</li>")
    .replace(/(<li[^>]*>.*?<\/li>)/gs, (m) => `<ul style='padding-left:20px;margin:8px 0'>${m}</ul>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' style='color:#38bdf8'>$1</a>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, " ");
}

// ── Build HTML email ───────────────────────────────────────────────────────
function buildHtml(version, changelogBody, recipientEmail) {
  const unsubUrl = `https://expo-assets-generator.vercel.app/api/unsubscribe?email=${encodeURIComponent(recipientEmail)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Expo Icon Generator v${version} Released</title>
</head>
<body style="margin:0;padding:0;background:#030712;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px">

    <div style="text-align:center;margin-bottom:40px">
      <p style="display:inline-block;background:#0f172a;border:1px solid #1e3a5f;border-radius:8px;padding:10px 20px;color:#38bdf8;font-weight:700;font-size:16px;margin:0 0 16px">
        Expo Icon Generator
      </p>
      <h1 style="color:#fff;font-size:26px;margin:0 0 8px">v${version} Released 🎉</h1>
      <p style="color:#9ca3af;margin:0">Here's what's new</p>
    </div>

    <div style="background:#111827;border:1px solid #1f2937;border-radius:12px;padding:28px;margin-bottom:32px;color:#d1d5db;font-size:15px;line-height:1.6">
      ${markdownToHtml(changelogBody) || "<p style='color:#9ca3af'>Bug fixes and improvements.</p>"}
    </div>

    <div style="text-align:center;margin-bottom:40px">
      <a href="https://expo-assets-generator.vercel.app"
         style="display:inline-block;background:#fff;color:#111827;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:15px">
        Try the Updated Tool →
      </a>
    </div>

    <div style="border-top:1px solid #1f2937;padding-top:20px;text-align:center">
      <p style="color:#6b7280;font-size:12px;margin:0 0 8px">
        You're receiving this because you subscribed to Expo Icon Generator updates.
      </p>
      <a href="${unsubUrl}" style="color:#6b7280;font-size:12px;text-decoration:underline">
        Unsubscribe
      </a>
    </div>

  </div>
</body>
</html>`;
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const subscribers = await getSubscribers();

  if (subscribers.length === 0) {
    console.log("No subscribers. Skipping.");
    return;
  }

  console.log(`Found ${subscribers.length} subscriber(s).`);

  const { version, body } = parseLatestChangelog();
  const subject = `🚀 Expo Icon Generator v${version} — What's New`;
  console.log(`Sending: "${subject}"`);

  const transporter = createTransport({
    service: "gmail",
    auth: { user: NEXT_GMAIL_USER, pass: NEXT_GMAIL_PASSWORD },
  });

  let sent = 0;
  let failed = 0;

  for (const email of subscribers) {
    try {
      await transporter.sendMail({
        from: `"Expo Icon Generator" <${NEXT_GMAIL_USER}>`,
        to: email,
        subject,
        html: buildHtml(version, body, email),
        headers: {
          "List-Unsubscribe": `<https://expo-assets-generator.vercel.app/api/unsubscribe?email=${encodeURIComponent(email)}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });
      sent++;
      console.log(`  ✓ ${email}`);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${email}: ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log(`\nDone. ${sent} sent, ${failed} failed.`);
  if (failed > 0 && sent === 0) process.exit(1);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
