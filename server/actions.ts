"use server";

import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

export async function getFolders({ userId,parentId }: { userId: string,parentId:string|null }) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return;
    }

    const allFolders = await db.folder.findMany({
      where: {
        profileId: userId,
        parentId
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return { allFolders };
  } catch (error) {
    return { error: error };
  }
}
