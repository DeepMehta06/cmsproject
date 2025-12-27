import { getAllBlogs } from "@/app/actions/getBlogs";
import EditableBlogCards from "./editableBlogCards";
import Pagination from "../pagination";
import config from "@/static/config";
import CategoryFilter from "../CategoryFilter";

export default async function AdminAllPosts({ page, category }) {
    const { post, count } = await getAllBlogs({ page, category });

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