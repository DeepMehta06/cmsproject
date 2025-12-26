import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import isAdmin from "@/utils/isAdmin";
import AdminAllPosts from "@/components/admin/adminAllPost";

export default async function Page({ searchParams }) {
    const session = await getServerSession(authOptions);
    const adminCheck = await isAdmin(session);

    const params = await searchParams; 
    const page = parseInt(params.page) || 1;
    const category = params.cat || null;

    if (!adminCheck) {
        return (
            <div className="p-10 text-red-500 font-bold">
                Not accessible.
            </div>
        );
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Admin Management</h1>
            <AdminAllPosts page={page} category={category} />
        </div>
    );
}