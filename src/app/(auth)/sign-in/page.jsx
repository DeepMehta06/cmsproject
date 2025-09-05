'use client';
import { NotebookIcon } from "lucide-react";
import { toast } from "sonner"
import SVGComponent from "@/components/icon";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
export default function Sign_In() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const onSignIn = async () => {
        try {
            setLoading(true);
            await signIn('google')
        } catch (error) {
            toast("Uh oh! Something went wrong.", {
                variant: "destructive",
                description: "There was a problem with your Sign In.",
            });
        } finally{
            setLoading(false);
        }
    }
    return (
        <section className="w-full h-screen rounded-xl flex flex-col items-center-safe justify-center-safe">
            <div className="flex flex-col gap-5 items-center-safe p-4 mx-6 bg-zinc-800/50 w-auto rounded-lg sm:w-1/2 md:w-2/5 lg:w-3/5">
                <NotebookIcon className="size-12" />
                <p className="text-center text-xl text-gray-400">Happy to have you at Stratus!<br />
                    To continue reading, Please Sign In
                </p>
                <button onClick={onSignIn} className="flex justify-center items-center-safe gap-2 rounded-lg bg-gray-800/50 text-gray-400 px-8 py-3 hover:bg-gray-800/70 hover:scale-105 hover:-translate-y-1 transition-all delay:50">
                    <SVGComponent className="w-6 h-6" />
                    <p className="text-lg">{loading ? "Loading..." : "Sign-In"}</p>
                </button>
            </div>
        </section>
    )
}