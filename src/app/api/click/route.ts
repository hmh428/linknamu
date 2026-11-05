import { connection } from "next/server";
import { profile } from "@/data/profile";
import { getClickCounts, incrementClick } from "@/lib/mongodb";

// 모든 링크의 현재 클릭 수를 한 번에 돌려줍니다. 예: { "github": 42, "blog": 3 }
export async function GET() {
  // 빌드 때 미리 만들어 두지 않고 요청마다 DB에서 최신 값을 읽도록 합니다.
  await connection();
  return Response.json(await getClickCounts(), {
    headers: { "Cache-Control": "no-store" },
  });
}

// 클릭한 링크의 클릭 수를 1 늘립니다.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const id = body?.id;

  // 등록된 링크의 클릭만 기록합니다.
  if (typeof id !== "string" || !profile.links.some((link) => link.id === id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const ok = await incrementClick(id);
  if (!ok) {
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 503 });
  }
  return Response.json({ ok: true });
}
