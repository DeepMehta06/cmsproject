'use client';
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOut(){
    return (
        <div onClick={()=> signOut({callbackUrl: '/sign-in'})} className="flex justify-center gap-3 align-middle items-center">
            <LogOutIcon className="w-4"/> Log Out!
        </div>
    )
}