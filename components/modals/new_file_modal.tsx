"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUpload from "../file_upload";
import { Button } from "../ui/button";

const NewFileModal = ({folderId}:{folderId:string}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Button>new file</Button>;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className=" dark:bg-neutral-300  ">new file</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <FileUpload folderId={folderId}  />
          <DialogTitle> </DialogTitle>
          <DialogDescription>
           
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewFileModal;
