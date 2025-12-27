import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('cat');

        const posts = await prisma.post.findMany({
            where: {
                status: "PUBLISHED",
                ...(category && {
                    catSlug: {
                        contains: category,
                        mode: 'insensitive' 
                    }
                })
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("Fetch Error:", error);
        return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
    }
}