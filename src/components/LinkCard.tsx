"use client";

import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  clicks?: number;
};

export default function LinkCard({ link, clicks }: Props) {
  // 페이지를 떠나도 요청이 끝까지 전송되도록 sendBeacon을 사용합니다.
  const recordClick = () => {
    const body = new Blob([JSON.stringify({ id: link.id })], { type: "application/json" });
    navigator.sendBeacon("/api/click", body);
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordClick}
      className="relative block w-full rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
    >
      {link.title}
      {clicks !== undefined && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
          {clicks.toLocaleString()}회
        </span>
      )}
    </a>
  );
}
