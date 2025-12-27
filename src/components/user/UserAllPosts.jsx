import Pagination from "../pagination";
import config from "@/static/config";
import CategoryFilter from "../CategoryFilter";
import { getUserAllBlogs } from "@/app/actions/getAllUserBlogs";
import EditableBlogCards from "../admin/editableBlogCards";

export default async function UserAllPosts({ page, category, authorId }) {
    const { post, count } = await getUserAllBlogs({ page, category, authorId });

    if (!post || post.length === 0) {
        return <div className="p-8 text-gray-400">No posts found.</div>;
    }

    return (
        <section className="p-8 flex flex-col gap-5">
            <p className="text-sm text-gray-500">Total posts: {count}</p>
            <CategoryFilter />
            {post.map(item => (
                <EditableBlogCards posts={item} key={item.id} />
            ))}
            <Pagination currentPage={page} totalItems={count} perPage={config.perPage} />
        </section>
    );
}