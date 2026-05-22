import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// GET /api/ideas/trending — top 6 ideas by likes × 3 + comments × 2 + recency boost
export async function GET() {
  const db = await getDb();
  const ideas = await db
    .collection("ideas")
    .aggregate([
      {
        $addFields: {
          ageDays: {
            $divide: [
              { $subtract: ["$$NOW", "$createdAt"] },
              1000 * 60 * 60 * 24,
            ],
          },
          likeCount: { $size: { $ifNull: ["$likes", []] } },
        },
      },
      {
        $addFields: {
          trendingScore: {
            $add: [
              { $multiply: ["$likeCount", 3] },
              { $multiply: [{ $ifNull: ["$commentCount", 0] }, 2] },
              {
                $cond: [
                  { $lte: ["$ageDays", 7] }, 15,
                  { $cond: [{ $lte: ["$ageDays", 30] }, 7, 0] },
                ],
              },
            ],
          },
        },
      },
      { $sort: { trendingScore: -1, createdAt: -1 } },
      { $limit: 6 },
    ])
    .toArray();

  return NextResponse.json(ideas);
}
