import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    // const { query } = await req.json();
    const { searchParams } = new URL(req.url);
     const query = searchParams.get('query')
    // const query = "test"



    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    // if(query==="") return

    const folders = await db.folder.findMany({
      where: {
        name: {
          contains: query || "",
        },
      },
    });

    return NextResponse.json(folders);
  } catch (error) {
    console.log("[SEARCH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
