import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireSession } from "@/lib/session";

export async function POST(_request, { params }) {
  try {
    const session = await requireSession();
    const { id } = await params;
    const db = await getDb();
    const idea = await db.collection("ideas").findOne({ _id: new ObjectId(id) });
    if (!idea) return NextResponse.json({ message: "Not found" }, { status: 404 });
    const email = session.user.email;
    const liked = (idea.likes || []).includes(email);
    const update = liked
      ? { $pull: { likes: email } }
      : { $addToSet: { likes: email } };
    await db.collection("ideas").updateOne({ _id: new ObjectId(id) }, update);
    return NextResponse.json({ liked: !liked });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
