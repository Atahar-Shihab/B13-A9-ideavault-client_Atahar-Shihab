import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await requireSession();
    const db = await getDb();
    const ideas = await db
      .collection("ideas")
      .find({ authorEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(ideas);
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
