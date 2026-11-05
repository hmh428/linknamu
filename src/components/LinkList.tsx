"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Props = {
  links: LinkItem[];
};

type Counts = Record<string, number>;

export default function LinkList({ links }: Props) {
  // 서버에서 받은 값. 받기 전에는 비어 있어 모든 카드가 0회로 보입니다.
  const [serverCounts, setServerCounts] = useState<Counts>({});
  // 이 화면에서 누른 횟수. 서버 값과 따로 두어 응답이 늦게 와도 +1이 사라지지 않게 합니다.
  const [localClicks, setLocalClicks] = useState<Counts>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/click", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Counts) => {
        if (!cancelled) setServerCounts(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // 카드를 누르면 화면의 숫자를 바로 1 올립니다. (서버 저장은 LinkCard가 담당)
  const handleClick = (id: string) => {
    setLocalClicks((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            clicks={(serverCounts[link.id] ?? 0) + (localClicks[link.id] ?? 0)}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
