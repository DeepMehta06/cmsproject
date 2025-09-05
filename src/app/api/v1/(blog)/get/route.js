import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function GET(request) {
    const post = await prisma.post.findMany();
    console.log(post, 'post')
    return NextResponse.json(post, {status: 200})
}