import { prisma } from "@/lib/prisma";

export default async function getSingleUser(id){
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            name: true,
            email: true,
            image: true, 
            createdAt: true,
            username: true,
            posts: {
                select: {
                    title: true,
                    slug: true,
                    thumbnail: true,
                    excerpt: true
                }
            }
        } 
    })
    return user;
}