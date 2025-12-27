import { prisma } from "@/lib/prisma"; 
import config from "@/static/config";

export async function getAllBlogs({ page = 1, category }) {
    const postToShow = config.perPage || 10;
    const currentPage = Math.max(1, page);

    let query = {
        take: postToShow,
        skip: postToShow * (currentPage - 1),
        where: {
            ...(category && {
                catSlug: {
                    contains: category,
                    mode: 'insensitive'
                }
            })
        },
        include: {
            author: {
                select: {
                    name: true,
                    image: true
                }
            }
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