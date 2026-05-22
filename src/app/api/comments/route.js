import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireSession } from "@/lib/session";

export async function POST(request) {
  try {
    const session = await requireSession();
    const body = await request.json();
    const db = await getDb();

    const comment = {
      ideaId: body.ideaId,
      text: body.text,
      userEmail: session.user.email,
      userName: session.user.name,
      userPhotoURL: session.user.photoURL || session.user.image || "",
      createdAt: new Date(),
    };

    const result = await db.collection("comments").insertOne(comment);
    await db
      .collection("ideas")
      .updateOne(
        { _id: new ObjectId(body.ideaId) },
        { $inc: { commentCount: 1 } }
      );
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
