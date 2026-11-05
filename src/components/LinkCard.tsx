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
      className="relative block w-full rounded-3xl border border-white/60 bg-white/40 px-14 py-[18px] text-center text-[15px] font-semibold shadow-[0_4px_20px_-6px_rgba(160,90,40,0.18)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_8px_28px_-8px_rgba(160,90,40,0.25)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
    >
      {link.title}
      {clicks !== undefined && (
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-normal tabular-nums text-muted/80">
          {clicks.toLocaleString()}회
        </span>
      )}
    </a>
  );
}
