import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

async function FetchAllUSers(){
    const res = await prisma.user.findMany();
    return res;
}
export default async function AdminAllUSers()
{
    const users = await FetchAllUSers();
    console.log("Users data:", users); // Debug log
    return <section className="p-5">
        {users.map((user, index) => {
            return <Link href={`/user/${user.id}`} key={index} className="flex flex-row gap-5 p-5 border border-gray-700 rounded-lg mb-3 bg-gray-600/20">
                <Image src={user.image} width={75} height={75} alt={user.name || "User"} className="rounded-full" />
                <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-lg">{user.name || "No name"}</h2>
                    <h3 className="text-sm text-gray-400">{user.email || "No email"}</h3>
                    <h3 className="text-sm text-gray-300">Username: {user.username || "Not set"}</h3>
                </div>
            </Link>
        })}
    </section>
}