import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { stringify } from "querystring";

export async function GET(request, context){
    const {slug} = await context.params;
    const post = await prisma.post.findUnique({
        where:{
            slug: slug,
            status: "PUBLISHED"
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

    console.log(post);

    if(!post){
        return NextResponse.json({message : "could not the post"}, {status : 404})
    }

    return NextResponse.json(JSON.stringify(post), {
        status : 200,
        headers : { 'content-type' : "application/json"}
    })
}