import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Props = {
  links: LinkItem[];
  // DB가 연결되지 않았으면 비어 있고, 그때는 클릭 수를 숨깁니다.
  clickCounts: Record<string, number>;
  showCounts: boolean;
};

export default function LinkList({ links, clickCounts, showCounts }: Props) {
  return (
    <ul className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} clicks={showCounts ? (clickCounts[link.id] ?? 0) : undefined} />
        </li>
      ))}
    </ul>
  );
}
