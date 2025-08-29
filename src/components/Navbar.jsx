import { Notebook } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
    const auth = false;
    const tempUser = {
        name: 'Deep',
        username: 'Deep06'
    }
    return (
        <div className="flex justify-between my-2 px-4 sm:px-4 lg:px-6">
            <div className="flex">
                <Notebook className="size-6" />
                <Link href="/blogs" className="px-3 py-1 text-sm hover:underline">
                    Back to Blogs
                </Link>
            </div>
            {
                !auth ?
                    (<Link href="/sign-in" className="px-3 py-1 text-sm hover:underline">
                        Sign-In/Sign-Up
                    </Link>) :
                    (<UserModalComponent user={tempUser} />)
            }
        </div>
    )
}

const UserModalComponent = ({ user }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>User</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Hi, {user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={`/profile/${user.username}`}>
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}