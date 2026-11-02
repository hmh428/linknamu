import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 모드의 핫 리로드 때마다 연결이 새로 생기지 않도록 전역에 보관합니다.
const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

export type ClickDoc = { _id: string; count: number };

// MONGODB_URI가 없으면 null을 반환해 DB 없이도 페이지가 동작하게 합니다.
export async function getClicksCollection() {
  if (!uri) return null;
  globalForMongo.mongoClientPromise ??= new MongoClient(uri).connect();
  const client = await globalForMongo.mongoClientPromise;
  return client.db(dbName).collection<ClickDoc>("clicks");
}

export async function getClickCounts(): Promise<Record<string, number>> {
  const clicks = await getClicksCollection();
  if (!clicks) return {};
  try {
    const docs = await clicks.find().toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return {};
  }
}
