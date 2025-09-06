import { getAuthsession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await getAuthsession();
    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
        title,
        content,
        excerpt,
        metaDescription,
        keywords,
        slug,
        ogImage,
        status,
        category,
    } = body;

    if (!title || !content || !slug || !category || !session.user.id) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const statusOfPost = status?.toUpperCase() === "PUBLISH" ? "PUBLISHED" : "DRAFT";

    try {
        let categoryCheck = await prisma.category.findUnique({
            where: { slug: category },
        });

        if (!categoryCheck) {
            categoryCheck = await prisma.category.create({
                data: {
                    title: category.charAt(0).toUpperCase() + category.slice(1),
                    slug: category,
                },
            });
        }

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                thumbnail: ogImage || null,
                desc: metaDescription || null,
                keywords: keywords || null,
                excerpt: excerpt || null,
                status: statusOfPost,
                category: categoryCheck.slug,
                catslug: {
                    connect: { slug: categoryCheck.slug }
                },
                author: {
                    connect: { id: session.user.id }
                }
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Post creation error:", error);
        return NextResponse.json(
            { message: "Couldn't upload or save the post" },
            { status: 500 }
        );
    }
}


