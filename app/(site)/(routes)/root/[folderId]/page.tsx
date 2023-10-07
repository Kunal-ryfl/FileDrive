import React from "react";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";
import Link from "next/link";
import { Folder, File } from "@prisma/client";
import { Bird, Folder as Folder_icon } from "lucide-react";
import Options from "@/components/options";
import NewFolderModal from "@/components/modals/new_folder_modal";
import NewFileModal from "@/components/modals/new_file_modal";
import Image from "next/image";
import Refresh from "@/components/refresh";
import FolderComponent from "@/components/folder-component";
import FileComponent from "@/components/file_component";
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation";



// export const dynamicParams = false

export async function generateStaticParams() {
  const folder = await db.folder.findMany();
 
  return folder.map((folder) => ({
    folderId: folder.id,
  }))
}

export async function generateMetadata({ params }: { params: { folderId: string } }){
  
  const folder = await db.folder.findUnique({where:{id:params.folderId}})  

  return {
    title:folder?.name,
    
  }
}



const Page = async ({ params }: { params: { folderId: string } }) => {
  const user = await currentProfile();
 
  const checkFolderValid = await db.folder.findUnique({
    where:{id:params.folderId}
  })

  if(checkFolderValid===null){
    return notFound()
  }
  // console.log(checkFolderValid)

  const allFolders = await db.folder.findMany({
    where: {
      profileId: user?.id,
      parentId: params.folderId,
    },
  });
  const allFiles = await db.file.findMany({
    where: {
      profileId: user?.id,
      folderId: params.folderId,
    },
    
  });
 

  // console.log(params.folderId)

  return (
    <div>
      <div className="      py-[2rem] container">
        <div className=" w-full justify-between  items-center my-3 flex ">
          <h1 className=" select-none font-medium text-xl">Folders </h1>
          <div className=" flex gap-3 items-center">
            <Refresh />
            <NewFolderModal parentId={params.folderId} />
          </div>
        </div>
        <div className="  grid grid-cols-2 sm:grid-cols-4  gap-3 ">
          {allFolders.length > 0 &&
            allFolders.map((folder: Folder) => (
              <FolderComponent key={folder.id} folder={folder} />
            ))}

          {allFolders.length === 0 && (
            <div className="col-span-full gap-2 text-base text-neutral-500  flex justify-center items-center h-32" >
              <Bird />
              <p className=" "> Nothing here ... </p>
            </div>
          )}
        </div>
      </div>

      <div className="      py-[2rem] container">
        <div className=" w-full justify-between items-center my-3 flex ">
          <h1 className=" select-none font-medium text-xl">Files</h1>
          <div className=" flex gap-3 items-center">
            <Refresh />
            <NewFileModal folderId={params.folderId} />
          </div>
        </div>
        <div className="  grid grid-cols-2 sm:grid-cols-4  gap-3 ">
          {allFiles.length > 0 &&
            allFiles.map((file: File) => <FileComponent file={file} key={file.id} />)}
          {allFiles.length === 0 && (
           <div className="col-span-full gap-2 text-base text-neutral-500  flex justify-center items-center h-32" >
           <Bird />
           <p className=" "> Nothing here ... </p>
         </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
