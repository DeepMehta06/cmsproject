import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { stringify } from "querystring";

export async function GET(request, context){
    const {slug} = await context.params;
    
    try {
        const post = await prisma.post.findFirst({
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

        console.log("Fetched post:", post);

        if(!post){
            return NextResponse.json({message : "Could not find the post"}, {status : 404})
        }

        return NextResponse.json(post, {status : 200})
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({message : "Error fetching post"}, {status : 500})
    }
}