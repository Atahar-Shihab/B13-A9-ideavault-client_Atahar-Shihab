import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireSession } from "@/lib/session";

// PATCH /api/user/profile — update name + photoURL
export async function PATCH(request) {
  try {
    const session = await requireSession();
    const { name, photoURL } = await request.json();
    const db = await getDb();

    // Better Auth stores users in the 'user' collection
    await db.collection("user").updateOne(
      { email: session.user.email },
      { $set: { name, photoURL, image: photoURL || session.user.image } }
    );

    return NextResponse.json({ success: true, name, photoURL });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
