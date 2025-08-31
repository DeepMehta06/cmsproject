import { getAuthsession } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function Dashboard(){
    const session = await getAuthsession();
    if(!session){
        return notFound();
    }
    return <div className="flex justify-center-safe align-middle place-items-center-safe w-full h-[80vh]">
        Welcome Back</div>
}