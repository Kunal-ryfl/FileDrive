import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/newUser";



export default async function Home() {
  const profile = await initialProfile();
 return redirect(`/root`);

  return (
   
    <div>
    <UserButton afterSignOutUrl="/"/>
  </div>
    )
}
