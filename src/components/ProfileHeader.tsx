import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image?: string;
};

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
          className="h-28 w-28 rounded-full object-cover ring-4 ring-white shadow-md"
        />
      ) : (
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-600 text-4xl font-bold text-white ring-4 ring-white shadow-md">
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-4 text-xl font-bold">{name}</h1>
      <p className="mt-1 text-sm text-neutral-600">{bio}</p>
    </header>
  );
}
