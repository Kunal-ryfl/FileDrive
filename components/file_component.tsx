"use client";
import React, { useState, useEffect } from "react";
import { File } from "@prisma/client";
import Options from "./options";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const FileComponent = ({ file }: { file: File }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className=" hover:brightness-[0.75] duration-500 relative">
      <Dialog>
        <DialogTrigger asChild>
          <div className="p-2  rounded-xl dark:bg-neutral-600 bg-rose-50">
            <div className=" flex justify-between ">
              <p className=" text-[15px] mr-10 font-medium my-2  line-clamp-1">
                {file.name}
              </p>
            </div>

            <div className="  aspect-video overflow-hidden relative border bg-rose-50 rounded-xl p-3 flex-col  gap-3  items-center flex">
              <Image
                src={
                  file.name.indexOf("pdf") === -1
                    ? `${file.link}`
                    : "https://user-images.githubusercontent.com/73430123/272627914-def1752d-7f24-48e0-bbe0-4ce9b636d15a.png"
                }
                style={{
                  objectFit:
                    file.name.indexOf("pdf") === -1 ? "cover" : "contain",
                }}
                fill
                alt={`${file.name}`}
                className=" duration-100  hover:scale-125"
              />
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className=" w-full   max-w-5xl">
          <DialogHeader>
            <DialogTitle>
              <p className=" text-[12px] font-medium ">{file.name}</p>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="  w-full  aspect-square  sm:aspect-video   max-w-5xl  relative">
            {file.name.indexOf("pdf") === -1 && (
              <Image
                src={
                  file.name.indexOf("pdf") === -1
                    ? `${file.link}`
                    : "https://user-images.githubusercontent.com/73430123/272627914-def1752d-7f24-48e0-bbe0-4ce9b636d15a.png"
                }
                style={{
                  objectFit:
                    file.name.indexOf("pdf") === -1 ? "contain" : "contain",
                }}
                fill
                alt={`${file.name}`}
                className="  "
              />
            )}

            {file.name.indexOf("pdf") !== -1 && (
              // <iframe src={`${file.link}`} className=" w-full h-full" />
<iframe
      src={`https://docs.google.com/viewer?url=${file.link}&embedded=true`}
      width="100%"
    className=" w-full h-full"
      title="Document Viewer"
    ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <div className=" absolute top-2  right-2 ">
        <Options folderName="" date={file.createdAt} type="FILE" id={file.id} />
      </div>
    </div>
  );
};

export default FileComponent;
