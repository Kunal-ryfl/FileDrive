import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    
    try {
        const { parentId, name } = await req.json();
        const profile = await currentProfile();
    
        if (!profile) {
          return new NextResponse("Unauthorized", { status: 404 });
        }

        const folder = parentId !== '' ? await db.folder.create({
            data:{
                name,
                profileId:profile.id,
                parentId
            }
        }) 
        : await db.folder.create({
            data:{
                name,
                profileId:profile.id,
            }
        }) 

        return NextResponse.json(folder);

    }
    catch(error){
        console.log("[FOLDER_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}