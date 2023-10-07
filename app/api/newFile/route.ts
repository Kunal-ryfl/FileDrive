import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    
    try {
        const { folderId, name,link } = await req.json();
        const profile = await currentProfile();
    
        if (!profile) {
          return new NextResponse("Unauthorized", { status: 404 });
        }

        const file =  await db.file.create({
            data:{
                name,
                profileId:profile.id,
                folderId,
                link
            }
        }) 
        

        return NextResponse.json(file);

    }
    catch(error){
        console.log("[FILE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}