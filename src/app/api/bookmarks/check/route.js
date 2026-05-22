import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireSession } from "@/lib/session";

// GET /api/bookmarks/check — returns array of bookmarked idea IDs for current user
export async function GET() {
  try {
    const session = await requireSession();
    const db = await getDb();
    const bookmarks = await db
      .collection("bookmarks")
      .find({ userEmail: session.user.email })
      .project({ ideaId: 1, _id: 0 })
      .toArray();
    return NextResponse.json(bookmarks.map((b) => b.ideaId));
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
