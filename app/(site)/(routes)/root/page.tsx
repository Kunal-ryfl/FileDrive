import React from "react";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { Folder } from "@prisma/client";
import NewFolderModal from "@/components/modals/new_folder_modal";
import FolderComponent from "@/components/folder-component";
import Refresh from "@/components/refresh";
import { Bird, FileStack } from "lucide-react";

const Page = async ({ params }: { params: { folderId: string } }) => {
  const user = await currentProfile();
  let allFolders = await db.folder.findMany({
    where: {
      profileId: user?.id,
    },
  });

  allFolders = allFolders.filter((x) => x.parentId === null);
  return (
    <div className=" ">
      <div className="   py-[2rem] container">
        <div className="  w-full justify-between  items-center my-3 flex">
          <h1 className=" select-none font-medium text-xl">Folders </h1>
          <div className=" flex gap-3 items-center">
            <Refresh />
            <NewFolderModal parentId={params.folderId} />
          </div>
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-4  gap-3 ">
          { allFolders.length>0 && allFolders.map((folder: Folder) => (
            <FolderComponent key={folder.id} folder={folder} />
          ))}
          {allFolders.length === 0 && (
            <div className="col-span-full gap-2 text-base text-neutral-500 flex-col  flex justify-center items-center  h-64" >
              <FileStack className=" scale-150 " />
              <p className=" select-none my-2"> stack your files </p>
              <p className=" select-none  font-bold  text-lg">Welcome to FileStack !</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
