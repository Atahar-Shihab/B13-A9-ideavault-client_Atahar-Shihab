import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireSession } from "@/lib/session";

// GET /api/interactions — ideas the user has commented on
export async function GET() {
  try {
    const session = await requireSession();
    const db = await getDb();
    const comments = await db
      .collection("comments")
      .find({ userEmail: session.user.email })
      .toArray();
    const ideaIds = [...new Set(comments.map((c) => c.ideaId))];
    const ideas = await Promise.all(
      ideaIds.map((id) =>
        db
          .collection("ideas")
          .findOne({ _id: new ObjectId(id) })
          .catch(() => null)
      )
    );
    return NextResponse.json(ideas.filter(Boolean));
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
