export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  // public/ 폴더 기준 경로 (예: "/profile.jpg"). 비워 두면 이름 첫 글자를 표시합니다.
  image?: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "황현뮌",
  bio: "초짜 바이브코더",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/" },
    { id: "instagram", title: "Instagram", url: "https://instagram.com/" },
    { id: "blog", title: "블로그", url: "https://blog.naver.com/" },
  ],
};
