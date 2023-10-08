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
import { Folder as FolderIcon, Search, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import toast from "react-hot-toast";
import { File, Folder } from "@prisma/client";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import moment from "moment";
const SearchModal = () => {
  const router = useRouter();
  const [res, setRes] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({ text: "" });
  const [isMounted, setIsMounted] = useState(false);

  function onClick(x: Folder) {
    router.push(`/root/${x.id}`);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    //here you will have correct value in userInput

    const { text } = query;
    if (text) onSearch(text);
  }, [query]);

  async function onChange(e: React.FormEvent<HTMLInputElement>) {
    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;

    console.log(value);

    setQuery({ ...query, text: value });
    // query = temp
  }

  async function onSearch(query: string) {
    // const element = e.currentTarget as HTMLInputElement;
    // const value = element.value;

    // console.log(value);

    // setQuery({ ...query, text: value });
    // query = temp
    // console.log(query);
    // setQuery(e.currentTarget.value)
    // console.log(query)
    setLoading(true);
    try {
      const data = await axios.get("/api/search", {
        params: {
          query: query,
        },
      });
      //   console.log(data);
      setRes(data.data);
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
    setLoading(false);
  }

  if (!isMounted) {
    return <Search />;
  }

  return (
    <Dialog>
      <DialogTrigger className=" cursor-pointer">
        <Search />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className=" my-3">Search Folder</p>
          </DialogTitle>
          <DialogDescription>
            <Input
              placeholder="Enter folder name"
              value={query.text}
              onChange={onChange}
            />
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[200px]  w-full rounded-md border p-4">
          {!loading &&
            query.text.length !== 0 &&
            res.map((x) => (
              <div key={x.id} className="  cursor-pointer  flex flex-col ">
                <div
                  onClick={() => onClick(x)}
                  className=" justify-between  items-center flex"
                >
                  <div className=" flex  items-center gap-3">
                    <FolderIcon className=" scale-75 dark:fill-neutral-900  fill-neutral-500 " />
                    <p className=" my-2 text-sm">{x.name}</p>
                  </div>
                  <p className=" text-sm "> {moment(x.createdAt).format("DD/MM/YYYY")}</p>
                </div>
                <Separator />
              </div>
            ))}

          {loading && <Loader2 className=" mx-auto   animate-spin" />}

          {res.length === 0 && query.text.length !== 0 && !loading && (
            <p className=" text-neutral-500  text-center">nothing...</p>
          )}

          {query.text.length === 0 && (
            <p className=" text-neutral-500 text-center"> start searching...</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
