import UserAllPosts from "@/components/user/UserAllPosts";
import getSingleUser from "@/app/actions/getSingleUser";
import Image from "next/image";
import { Poppins } from "next/font/google";
import dateFormat from "@/utils/dateFormat";
export default async function SingleUser({params, searchParams}) {
    const {id} = await params;
    const resolvedSearchParams = await searchParams;
    
    const user = await getSingleUser(id);
    const page = parseInt(resolvedSearchParams?.page) || 1;
    const category = resolvedSearchParams?.cat || null;
    return (
        <div className="p-5">
            <div className="mb-6">
                <UserProfile user={user} id={id}/>
            </div>
            <UserAllPosts page={page} category={category} authorId={id} />
        </div>
    )
}

const UserProfile = ({user, id}) => {
    return (
        <div className="bg-gray-600/10 flex flex-row gap-5 p-4 rounded-2xl items-center font-family-poppins">
            <Image src={user.image} width={80} height={80} className="rounded-xl" alt={user.name}/>
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-4xl">{user.name}</h1>
                <p className="text-gray-400 text-md">{user.email}</p>
                <p className="text-gray-500 text-xs">Username: {user.username || "Not set"}</p>
                <p className="text-gray-500 text-xs">Joined: {dateFormat(user.createdAt)}</p>
            </div>
        </div>
    )
}