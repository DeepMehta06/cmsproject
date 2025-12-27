import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAllPosts from "@/components/user/UserAllPosts";
import isUser from "@/utils/isUser";

export default async function Page({ searchParams }) {
    const session = await getServerSession(authOptions);
    const userCheck = await isUser(session);

    const params = await searchParams; 
    const page = parseInt(params.page) || 1;
    const category = params.cat || null;
    const authorId = session?.user?.id;

    if (!userCheck) {
        return (
            <div className="p-10 text-red-500 font-bold">
                Not accessible.
            </div>
        );
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            < UserAllPosts page={page} category={category} authorId = {authorId} />
        </div>
    );
}