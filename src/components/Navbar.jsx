import { Notebook } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import SignOut from "./Signout";
import BackToBlogsLink from "./BackToBlogs";
import { SidebarTrigger } from "./ui/sidebar";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-josefin_sans",
});

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <div className={`${josefin.className} flex justify-between items-center my-2 px-4 sm:px-4 lg:px-6`}>
            {/* Left side: Logo */}
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center-safe justify-center-safe gap-5">
                    <SidebarTrigger />
                    <Link href="/">
                        <Notebook className="size-7 text-primary" /> {/* Brand logo */}
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <BackToBlogsLink />
                {!session ? (
                    <Link href="/sign-in" className="px-3 py-1 text-sm hover:underline">
                        Sign-In/Sign-Up
                    </Link>
                ) : (
                    <UserModalComponent user={session.user} />
                )}
            </div>
        </div>
    );
}

const UserModalComponent = ({ user }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-1 text-sm hover:underline" >
                <Image src={user.image} width={40} height={40} alt="user-image" className="rounded-full border-2 border-gray-700 transition-all duration-200 hover:scale-105 hover:-translate-y-1.5 hover:shadow-[0 0 10px gray-400] hover:shadow-xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`${josefin.className}`}>
                <DropdownMenuLabel>Hi, {user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={`/profile/${user.username}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SignOut />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};