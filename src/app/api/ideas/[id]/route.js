import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireSession } from "@/lib/session";

// GET /api/ideas/[id]
export async function GET(_request, { params }) {
  try {
    await requireSession();
    const { id } = await params;
    const db = await getDb();
    const idea = await db.collection("ideas").findOne({ _id: new ObjectId(id) });
    if (!idea) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(idea);
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// PUT /api/ideas/[id]
export async function PUT(request, { params }) {
  try {
    const session = await requireSession();
    const { id } = await params;
    const db = await getDb();
    const idea = await db.collection("ideas").findOne({ _id: new ObjectId(id) });
    if (!idea) return NextResponse.json({ message: "Not found" }, { status: 404 });
    if (idea.authorEmail !== session.user.email)
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    const { _id, ...updates } = await request.json();
    const result = await db
      .collection("ideas")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// DELETE /api/ideas/[id]
export async function DELETE(_request, { params }) {
  try {
    const session = await requireSession();
    const { id } = await params;
    const db = await getDb();
    const idea = await db.collection("ideas").findOne({ _id: new ObjectId(id) });
    if (!idea) return NextResponse.json({ message: "Not found" }, { status: 404 });
    if (idea.authorEmail !== session.user.email)
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    await db.collection("ideas").deleteOne({ _id: new ObjectId(id) });
    await db.collection("comments").deleteMany({ ideaId: id });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
