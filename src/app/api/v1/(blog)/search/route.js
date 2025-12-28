import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request){
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if(!query) return NextResponse({message : "No query found"}, {status:404});

    const post = await prisma.post.findMany({
        where : {
            status : 'PUBLISHED',
            OR : [
                {title : {contains : query, mode : 'insensitive'}},
                {content : {contains : query, mode : 'insensitive'}},
            ]
        },
        include : {
            author : {
                select : {
                    name : true,
                    image : true
                }
            }
        }
    })

    if(!post) return NextResponse({
        message : "No post with given specifications"
    })

    return NextResponse.json(post, {status : 200})
}