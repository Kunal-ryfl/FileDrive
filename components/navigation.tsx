import React from "react";
import { UserButton } from "@clerk/nextjs";
import { FileStack } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./modetoggle";
import { Separator } from "./ui/separator";
const Navigation = () => {
  return (
    <>
      <div className=" sticky top-0 backdrop-blur-md flex justify-between items-center z-50  p-6 container ">
        <Link href={"/"}>
          <div className=" flex gap-2">
            <FileStack className="  scale-125" />
            <h1 className="  font-medium">FileStack</h1>
          </div>
        </Link>
        <div className=" items-center flex gap-5">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Navigation;
