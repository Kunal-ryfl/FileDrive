import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    // const { query } = await req.json();
    const { searchParams } = new URL(req.url);
     const userId = searchParams.get('userId')
    // const query = "test"

    // const profile = await currentProfile();

    // if (!profile) {
    //   return new NextResponse("Unauthorized", { status: 404 });
    // }

    // if(query==="") return

    const allFolders = await db.folder.findMany({
        where: {
          // profileId:"12aff45e-e070-4fea-8442-9bca9762a085",
          profileId:userId || "",
          
        },
        orderBy:{
          createdAt:'asc'
        }
      });

    return NextResponse.json(allFolders);
  } catch (error) {
    console.log("[ROOTFOLDER_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
