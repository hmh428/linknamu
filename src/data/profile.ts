export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  // public/ 폴더 기준 경로(예: "/profile.jpg") 또는 외부 URL. 비워 두면 이름 첫 글자를 표시합니다.
  image?: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "황00",
  bio: "풀스택 개발자",
  image: "https://placehold.co/150x150/orange/white",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/" },
    { id: "instagram", title: "Instagram", url: "https://instagram.com/" },
    { id: "blog", title: "블로그", url: "https://blog.naver.com/" },
  ],
};
