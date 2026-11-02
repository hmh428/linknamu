import { profile } from "@/data/profile";
import { getClickCounts, getClicksCollection } from "@/lib/mongodb";

export async function GET() {
  return Response.json(await getClickCounts());
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const id = body?.id;

  // 등록된 링크의 클릭만 기록합니다.
  if (typeof id !== "string" || !profile.links.some((link) => link.id === id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const clicks = await getClicksCollection();
  if (!clicks) {
    return Response.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  await clicks.updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
  return Response.json({ ok: true });
}
