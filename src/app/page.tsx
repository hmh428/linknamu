import { Suspense } from "react";
import { connection } from "next/server";
import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";
import { getClickCounts } from "@/lib/mongodb";

// 클릭 수는 요청마다 최신 값이 필요하므로 이 부분만 동적으로 스트리밍합니다.
async function LinksWithCounts() {
  await connection();
  const clickCounts = await getClickCounts();
  return (
    <LinkList
      links={profile.links}
      clickCounts={clickCounts}
      showCounts={Boolean(process.env.MONGODB_URI)}
    />
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 justify-center bg-gradient-to-b from-emerald-50 to-neutral-100 px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />
        <Suspense fallback={<LinkList links={profile.links} clickCounts={{}} showCounts={false} />}>
          <LinksWithCounts />
        </Suspense>
        <footer className="mt-auto text-xs text-neutral-400">링크나무</footer>
      </div>
    </main>
  );
}
