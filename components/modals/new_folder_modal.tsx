"use client";
import React, { useState,useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const NewFolderModal = ({ parentId }: { parentId: string }) => {

  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);


  const router = useRouter();
  const [folderName, setFolderName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const loadingToast  = toast.loading("creating folder...") 
    try {
      await axios.post("/api/newFolder", { name: folderName, parentId });
      router.refresh();
      toast.success("folder created",{id:loadingToast,position:'bottom-right'});

    } catch (error) {
      toast.error("error",{id:loadingToast,position:'bottom-right'});
      console.log(error);
    }
    setFolderName("")
    setLoading(false);
  };

  if (!isMounted) {
    return <Button className=" dark:bg-neutral-300  ">new folder</Button>;
  }

  return (
    <Dialog >
      <DialogTrigger>
        <Button className=" dark:bg-neutral-300  "> new folder</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
          <DialogDescription>
            <Input
              onChange={(e) => setFolderName(e.currentTarget.value)}
              className="my-3 font-medium "
              placeholder="Enter folder name"
              value={folderName}
            />
            <Button
              onClick={onSubmit}
              disabled={folderName === "" || loading}
              className=" "
            >
              {loading ?<div className=" flex  items-center gap-2"> <Loader2 className=" animate-spin" />  <p>creating</p> </div> : <p>create</p>}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewFolderModal;
