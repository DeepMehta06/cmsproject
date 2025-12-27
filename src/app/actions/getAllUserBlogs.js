import { prisma } from "@/lib/prisma"; // Adjust this path to your prisma client file
import config from "@/static/config";

export async function getUserAllBlogs({ page = 1, category , authorId}) {
    const postToShow = config.perPage || 10;
    // Ensure page is at least 1
    const currentPage = Math.max(1, page);

    let query = {
        take: postToShow,
        skip: postToShow * (currentPage - 1),
        where: {
            authorId : authorId,
            ...(category && {
                catSlug: {
                    contains: category,
                    mode: 'insensitive'
                }
            })
        },
        orderBy: {
            createdAt: "desc"
        }
    };

    const [post, count] = await prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({
            where: query.where
        })
    ]);

    return { post, count };
}