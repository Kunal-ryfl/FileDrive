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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FolderEdit, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const FolderRenameModal = ({ folderId,oldName }: { folderId: string,oldName:string }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [folderName, setFolderName] = useState<string>(oldName);
  const [loading, setLoading] = useState(false);

  const onRename = async () => {
    setLoading(true);
    const loadingToast = toast.loading("renaming folder...");
    try {
      await axios.post("/api/rename", { folderId, newName: folderName });
      router.refresh();
      toast.success("folder renamed", {
        id: loadingToast,
        position: "bottom-right",
      });
    } catch (error) {
      toast.error("error", { id: loadingToast, position: "bottom-right" });
      console.log(error);
    }
    setFolderName("");
    setLoading(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Button className=" dark:bg-neutral-300  ">rename</Button>;
  }

  return (
    <Dialog>
      <DialogTrigger className="  hover:bg-neutral-100 hover:text-black  text-neutral-600   w-full relative flex cursor-point  items-center rounded-sm px-2 gap-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        <FolderEdit className=" scale-75" />
        Rename
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Folder</DialogTitle>
          <DialogDescription>
            <Input
              onChange={(e) => setFolderName(e.currentTarget.value)}
              className="my-3 font-medium "
              placeholder="Enter folder name"
              value={folderName}
            />
            <Button
              onClick={onRename}
              disabled={folderName === "" || loading}
              className=" "
            >
              {loading ? (
                <div className=" flex  items-center gap-2">
                  <Loader2 className=" animate-spin" /> <p>renaming</p>
                </div>
              ) : (
                <p>rename</p>
              )}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FolderRenameModal;
