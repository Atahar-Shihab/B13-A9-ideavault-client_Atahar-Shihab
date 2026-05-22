import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireSession } from "@/lib/session";

// GET /api/ideas — list with search, category, date filters
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search   = searchParams.get("search");
  const category = searchParams.get("category");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo   = searchParams.get("dateTo");

  const query = {};
  if (search) query.title = { $regex: search, $options: "i" };
  if (category && category !== "all") query.category = category;
  if (dateFrom || dateTo) {
    query.createdAt = {};
    if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59, 999);
      query.createdAt.$lte = end;
    }
  }

  const db = await getDb();
  const ideas = await db
    .collection("ideas")
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(ideas);
}

// POST /api/ideas — create idea (private)
export async function POST(request) {
  try {
    const session = await requireSession();
    const body = await request.json();
    const db = await getDb();

    const idea = {
      ...body,
      authorEmail: session.user.email,
      authorName: session.user.name,
      authorPhotoURL: session.user.photoURL || session.user.image || "",
      commentCount: 0,
      likes: [],
      createdAt: new Date(),
    };

    const result = await db.collection("ideas").insertOne(idea);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
