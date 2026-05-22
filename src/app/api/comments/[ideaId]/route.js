import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(_request, { params }) {
  const { ideaId } = await params;
  const db = await getDb();
  const comments = await db
    .collection("comments")
    .find({ ideaId })
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(comments);
}
