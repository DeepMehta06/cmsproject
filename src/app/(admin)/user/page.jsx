import { authOptions } from "@/lib/auth"
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth"
import AdminAllUSers from "@/components/admin/allUsers";
export default function AllUsers(){
    const session = getServerSession(authOptions);
    if(!session){
        rerturn (<section>
            You are not authenticated
        </section>)
    }
    const adminCheck = isAdmin(session);
    if(!adminCheck)
        return <h1>You are not the admin</h1>
    return <AdminAllUSers />
}