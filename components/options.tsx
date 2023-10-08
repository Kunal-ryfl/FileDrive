"use client"
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Clock4, FolderEdit, MoreVertical, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import moment from "moment";
import FolderRenameModal from "./modals/folder_rename_modal";
import { useRouter } from "next/navigation";
const Options = ({
  id,
  type,
  date,
  folderName,
}: {
  id: string;
  type: string;
  date: Date;
  folderName: string;
}) => {
  const router = useRouter()
  
  async function onDelete() {
    const loadingToast = toast.loading("deleting...");
    try {
      await axios.post("/api/delete", { id, type });
      // router.refresh();
      toast.success("deleted sucessfully", {
        id: loadingToast,
        position: "bottom-right",
      });
      router.refresh()

    } catch (error) {
      toast.error("error", { id: loadingToast, position: "bottom-right" });

      console.log(error);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" z-30">
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {type == "FOLDER" && (
          <DropdownMenuItem asChild>
            <FolderRenameModal oldName={folderName} folderId={id} />
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className=" cursor-pointer text-red-600 gap-2"
          onClick={onDelete}
        >
          <Trash2 className=" scale-75" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem className="  pointer-events-none text-neutral-500 cursor-pointer  gap-2">
          <Clock4 className="  scale-75" />
          {moment(date).fromNow()}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
