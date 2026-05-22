import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireSession } from "@/lib/session";

// GET /api/bookmarks — get all bookmarked ideas for current user
export async function GET() {
  try {
    const session = await requireSession();
    const db = await getDb();
    const bookmarks = await db
      .collection("bookmarks")
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();
    const ideas = await Promise.all(
      bookmarks.map((b) =>
        db
          .collection("ideas")
          .findOne({ _id: new ObjectId(b.ideaId) })
          .catch(() => null)
      )
    );
    return NextResponse.json(ideas.filter(Boolean));
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// POST /api/bookmarks — toggle bookmark
export async function POST(request) {
  try {
    const session = await requireSession();
    const { ideaId } = await request.json();
    const db = await getDb();
    const existing = await db
      .collection("bookmarks")
      .findOne({ userEmail: session.user.email, ideaId });
    if (existing) {
      await db
        .collection("bookmarks")
        .deleteOne({ userEmail: session.user.email, ideaId });
      return NextResponse.json({ bookmarked: false });
    } else {
      await db.collection("bookmarks").insertOne({
        userEmail: session.user.email,
        ideaId,
        createdAt: new Date(),
      });
      return NextResponse.json({ bookmarked: true });
    }
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
