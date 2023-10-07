"use client";
import React from "react";
import { Folder } from "@prisma/client";
import { useRouter } from "next/navigation";
import Options from "./options";
import { FolderIcon } from "lucide-react";
const FolderComponent = ({ folder }: { folder: Folder }) => {
  const router = useRouter();
  return (
    <div className="  hover:brightness-90 flex w-full dark:bg-neutral-600 bg-rose-50 rounded-xl  ">
      <div
        className="   w-4/5 p-3  gap-3 items-center flex"
        onDoubleClick={() => router.push(`/root/${folder.id}`)}
      >
        <div>
          <FolderIcon className="  dark:fill-neutral-900  fill-neutral-500" />
        </div>

        <h1 className="  truncate    select-none text-base  font-medium  ">
          {folder.name}
        </h1>
      </div>

      <div
        // onDoubleClick={() => router.push(`/root/${folder.id}`)}
        className=" w-1/5  flex justify-center items-center  "
      >
        <Options folderName={folder.name} date={folder.createdAt} id={folder.id} type="FOLDER" />
      </div>
    </div>
  );
};

export default FolderComponent;
