"use client";
import React from "react";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { Folder } from "@prisma/client";
import FolderComponent from "./folder-component";
import { FileStack, FolderIcon, MoreVertical } from "lucide-react";
import { useMutationState, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getFolders } from "@/server/actions";

const Foldersroot = ({userId }: { userId: string }) => {
  // const user = await currentProfile();
  // async function getFolders() {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:3000/api/folders/root",
  //       {
  //         params: {
  //           userId,
  //         },
  //       }
  //     );
  //     // console.log("zx ",data)
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const variables = useMutationState<Folder>({
    filters: { mutationKey: ["addFolder"], status: "pending" },
    select: (mutation) => mutation.state.variables as Folder,
  });

  // console.log(userId);

  const { data,error,isPending } = useQuery({
    queryKey: ["foldersRoot"],
    queryFn:()=>getFolders({userId,parentId:null}),
  });

  let allFolders = data?.allFolders;
  allFolders = allFolders?.filter((x: Folder) => x?.parentId === null);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <div className=" grid grid-cols-2 sm:grid-cols-4  gap-3 ">
      {allFolders &&
        allFolders.length > 0 &&
        allFolders.map((folder: Folder) => (
          <FolderComponent key={folder.id} folder={folder} />
        ))}

      {variables.map((pending) => (
        <div  key={pending.id} className=" pointer-events-none opacity-50  duration-500  flex w-full dark:bg-neutral-600 bg-rose-50 rounded-xl  ">
          <div className="   w-4/5 p-3  gap-3 items-center flex">
            <div>
              <FolderIcon className="  dark:fill-neutral-900  fill-neutral-500" />
            </div>

            <h1 className="  truncate    select-none text-base  font-medium  ">
              {pending.name}
            </h1>
          </div>

          <div className=" w-1/5  flex justify-center items-center  ">
            <MoreVertical />
          </div>
        </div>
      ))}

      {allFolders && allFolders.length === 0 && (
        <div className="col-span-full gap-2 text-base text-neutral-500 flex-col  flex justify-center items-center  h-64">
          <FileStack className=" scale-150 " />
          <p className=" select-none my-2"> stack your files </p>
          <p className=" select-none  font-bold  text-lg">
            Welcome to FileStack !
          </p>
        </div>
      )}
    </div>
  );
};

export default Foldersroot;
