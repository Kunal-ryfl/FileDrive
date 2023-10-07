import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    
    try {
        const { folderId, newName } = await req.json();
        const profile = await currentProfile();
    
        if (!profile) {
          return new NextResponse("Unauthorized", { status: 404 });
        }

        const folder = await db.folder.update({
            where:{
                id:folderId,
            },
            data:{
                name:newName
            }
        })

        return NextResponse.json(folder);

    }
    catch(error){
        console.log("[FOLDER_RENAME]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}