import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
export async function PATCH(request) {
    const {id, status} = await request.json();
    if(!["DRAFT", "PUBLISHED", "ARCHIEVED", "DELETED"].includes(status)){
        return NextResponse.json({message : "Invalid Status"}, { status : 404 });
    }

    const session = await getServerSession(authOptions);
    const adminCheck = await isAdmin(session);
    if(!adminCheck){
        return NextResponse.json({
            message:"Not Authorized",
        },
    {
        status:400
    })
    }

    const grabPost = await prisma.post.findUnique({
        where : {id}
    })

    const isAuthor = grabPost.authorId == session.user.id;

    if(!isAuthor && !adminCheck){
        return NextResponse.json({
            message:"Not Authorized",
        },
    {
        status:400
    })
    }

    const updatePost = await prisma.post.update({
        where : {id},
        data : {status}
    })
    console.log(updatePost)
    revalidatePath("/blog"); 
    revalidatePath("/posts");
    return NextResponse.json(updatePost, {status : 200})
}