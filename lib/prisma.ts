import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const url = process.env.DATABASE_URL ?? "";
  // Use Neon WebSocket adapter only when connecting to a Neon cloud database
  const isNeon = url.includes("neon.tech") || url.includes("@ep-");

  if (isNeon) {
    const adapter = new PrismaNeon({ connectionString: url });
    return new PrismaClient({ adapter });
  }

  // Local PostgreSQL — standard Prisma client
  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
