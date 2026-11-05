import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 모드의 핫 리로드 때마다 연결이 새로 생기지 않도록 전역에 보관합니다.
const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

export type ClickDoc = { _id: string; count: number };

// MONGO_URL이 없으면 null을 반환해 DB 없이도 페이지가 동작하게 합니다.
export async function getClicksCollection() {
  if (!uri) return null;
  globalForMongo.mongoClientPromise ??= new MongoClient(uri).connect().catch((error) => {
    // 연결에 실패하면 캐시를 비워 다음 요청에서 다시 시도하게 합니다.
    globalForMongo.mongoClientPromise = undefined;
    throw error;
  });
  const client = await globalForMongo.mongoClientPromise;
  return client.db(dbName).collection<ClickDoc>("clicks");
}

export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const clicks = await getClicksCollection();
    if (!clicks) return {};
    const docs = await clicks.find().toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return {};
  }
}

export async function incrementClick(id: string): Promise<boolean> {
  try {
    const clicks = await getClicksCollection();
    if (!clicks) return false;
    await clicks.updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
    return true;
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return false;
  }
}
