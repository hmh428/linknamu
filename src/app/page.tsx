import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="relative isolate flex flex-1 justify-center overflow-hidden px-6 pt-20 pb-10 sm:pt-24">
      {/* 유리 카드 뒤에 비치는 은은한 빛 번짐 (장식용) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-orange-200/60 blur-3xl" />
        <div className="absolute bottom-0 -right-20 h-72 w-72 rounded-full bg-rose-200/50 blur-3xl" />
      </div>
      <div className="flex w-full max-w-sm flex-col items-center gap-10">
        <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />
        {/* 클릭 수는 브라우저에서 /api/click으로 받아와 채웁니다 */}
        <LinkList links={profile.links} />
        <footer className="mt-auto pt-6 text-xs tracking-wide text-muted/70">링크나무</footer>
      </div>
    </main>
  );
}
