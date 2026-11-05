import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image?: string;
};

// 바깥 흰 테두리 + 아래로 떨어지는 따뜻한 그림자로 사진이 살짝 떠 보이게
const avatarClass =
  "h-28 w-28 rounded-full object-cover ring-4 ring-white/80 shadow-[0_12px_28px_-8px_rgba(180,100,50,0.35),0_2px_6px_rgba(120,70,40,0.12)]";

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {image ? (
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={112}
          height={112}
          priority
          // 외부 이미지(placehold.co 등, SVG 포함)는 최적화 없이 그대로 로드
          unoptimized={image.startsWith("http")}
          className={avatarClass}
        />
      ) : (
        <div
          className={`${avatarClass} flex items-center justify-center bg-gradient-to-br from-orange-300 to-orange-400 text-4xl font-bold text-white`}
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-1.5 text-[15px] text-muted">{bio}</p>
    </header>
  );
}
