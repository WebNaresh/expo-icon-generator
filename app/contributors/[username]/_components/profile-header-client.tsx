"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { downloadCertificate } from "@/lib/certificate-generator";

interface ProfileAvatarProps {
  avatarUrl: string;
  displayName: string;
}

export function ProfileAvatar({ avatarUrl, displayName }: ProfileAvatarProps) {
  return (
    <Image
      src={avatarUrl}
      alt={`${displayName} profile picture`}
      width={150}
      height={150}
      className="rounded-full border-4 border-gray-700 shadow-lg"
      priority
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "/default-avatar.png";
      }}
    />
  );
}

interface DownloadCertificateButtonProps {
  username: string;
  name: string | null;
  contributions: number;
  joinDate: string;
}

export function DownloadCertificateButton({
  username,
  name,
  contributions,
  joinDate,
}: DownloadCertificateButtonProps) {
  const handleClick = () => {
    try {
      downloadCertificate({ username, name, contributions, joinDate });
    } catch (error) {
      console.error("Error downloading certificate:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-white transition-colors hover:bg-sky-700"
    >
      <Download className="h-4 w-4" />
      Certificate
    </button>
  );
}
