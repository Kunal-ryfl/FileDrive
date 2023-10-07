import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { id, type } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    let obj;
    if (type === "FILE") {
      const file = await db.file.delete({
        where: {
          id,
        },
      });
      obj = file
    } else {
      const folder = await db.folder.delete({
        where: {
          id,
        },
      });
      obj = folder
    }

    return NextResponse.json(obj);
  } catch (error) {
    console.log("[DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
