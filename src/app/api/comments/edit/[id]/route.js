import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireSession } from "@/lib/session";

export async function PUT(request, { params }) {
  try {
    const session = await requireSession();
    const { id } = await params;
    const db = await getDb();
    const comment = await db
      .collection("comments")
      .findOne({ _id: new ObjectId(id) });
    if (!comment) return NextResponse.json({ message: "Not found" }, { status: 404 });
    if (comment.userEmail !== session.user.email)
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    const { text } = await request.json();
    await db
      .collection("comments")
      .updateOne({ _id: new ObjectId(id) }, { $set: { text } });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const session = await requireSession();
    const { id } = await params;
    const db = await getDb();
    const comment = await db
      .collection("comments")
      .findOne({ _id: new ObjectId(id) });
    if (!comment) return NextResponse.json({ message: "Not found" }, { status: 404 });
    if (comment.userEmail !== session.user.email)
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    await db.collection("comments").deleteOne({ _id: new ObjectId(id) });
    await db
      .collection("ideas")
      .updateOne(
        { _id: new ObjectId(comment.ideaId) },
        { $inc: { commentCount: -1 } }
      );
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
