import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }){
    const { id } = await params;

    const session = await getServerSession(authOptions);
    const adminCheck = await isAdmin(session);

    const grabPost = await prisma.post.findUnique({ 
        where: { id },
    })

    if(!grabPost) return NextResponse.json({ message: "no such posts found"}, { status: 404 })

    const isAuthor = grabPost.authorId == session.user.id;

    if(isAuthor || adminCheck){
        const deletedPost = await prisma.post.delete({
            where: { id }
        })
        return NextResponse.json(deletedPost, { status: 200 })
    }
    return NextResponse.json({ message: "Not authorized"}, { status: 403 })
}