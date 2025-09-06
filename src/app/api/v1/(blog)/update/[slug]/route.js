import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth/next";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(request, { params }){
    const { slug } = params;
    const body = await request.json();
    const {title, ogImage, content, excerpt, metaDescription, category, keywords, status} = body;

    const session = await getServerSession(authOptions);
    const admin = await isAdmin(session);
    // console.log(session, 'inside put verb the session is given');
    
    const post = await prisma.post.findUnique({
        where: { slug },
        select: { authorId: true }
    })

    console.log(post)

    if(!post){
        return NextResponse.json({ message: "Post not found" }, { status : 404 })
    }

    const isAuthor = post.authorId === session.user.id;

    if(!isAuthor && !admin){
        return NextResponse.json({ message: "Not authorized" }, { status : 403 })
    }

    try {
        const updatedPost = await prisma.post.update({
            where: { slug },
            data: { 
                title, 
                content,
                thumbnail: ogImage || null,
                desc: metaDescription || null,
                keywords: keywords || null,
                excerpt,
                status
            }
        })
        revalidateTag(slug);

        return NextResponse.json(updatedPost, { status: 200 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "failed to update Post"}, { status: 500 })
    }
}

export async function GET(request, { params }){
    const { slug } = params;

    // --- LOG 1: What slug are we getting from the URL? ---
    // console.log(`[LOG 1] GET request received for slug: "${slug}"`);

    try {
        const post = await prisma.post.findUnique({
            where: { slug: slug },
        });

        // --- LOG 2: What did Prisma return? ---
        // console.log("[LOG 2] Prisma query result:", post);

        if (!post) {
            // --- LOG 3: This block runs if the post is not found ---
            // console.log("[LOG 3] Post is null or undefined. Sending 404 Not Found.");
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // --- LOG 4: This block runs ONLY if the post was found ---
        // console.log("[LOG 4] Post was found. Proceeding with authorization check.");

        const session = await getServerSession(authOptions);
        const admin = await isAdmin(session);

        // Add a check for the session itself
        if (!session || !session.user) {
            // console.log("[LOG 5] No valid session found. Sending 401 Unauthorized.");
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        const isAuthor = session.user.id == post.authorId;
        // console.log(`[LOG 6] Authorization check: isAuthor = ${isAuthor}`);

        if (!isAuthor && !admin) {
            return NextResponse.json({ message: "You are not allowed to edit the post"}, { status: 403 });
        }
        
        return NextResponse.json(post, { status: 200 });

    } catch (error) {
        // --- LOG E: This block runs if there was a server error ---
        console.error("[ERROR] An error occurred in the GET handler:", error);
        return NextResponse.json({ message: "An internal server error occurred" }, { status: 500 });
    }
}