"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import dateFormat from "@/utils/dateFormat";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-poppins",
});

export default function Blogs() {
    const [query, setQuery] = useState('');
    const [allBlogs, setAllBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all blogs on mount
    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get/`);
                const data = await res.json();
                setAllBlogs(data);
                setFilteredBlogs(data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllBlogs();
    }, []);

    // Filter blogs based on search query
    useEffect(() => {
        if (!query.trim()) {
            setFilteredBlogs(allBlogs);
            return;
        }

        const searchLower = query.toLowerCase();
        const filtered = allBlogs.filter(blog => 
            blog.title?.toLowerCase().includes(searchLower) ||
            blog.excerpt?.toLowerCase().includes(searchLower) ||
            blog.catSlug?.toLowerCase().includes(searchLower) ||
            blog.keywords?.toLowerCase().includes(searchLower)
        );
        setFilteredBlogs(filtered);
    }, [query, allBlogs]);

    return (
        <section className={`p-5 ${poppins.className}`}>
            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
                <div className="flex gap-2">
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        type="text"
                        placeholder="Search posts by title, excerpt, category, or keywords..."
                        className="bg-gray-600/10 w-full border-gray-700 border-2 rounded-xl p-3 focus:border-primary focus:outline-none transition-colors"
                    />
                    {query && (
                        <button 
                            onClick={() => setQuery('')}
                            className="bg-gray-600/10 hover:bg-gray-600/20 text-white px-4 rounded-xl transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>
                {query && (
                    <p className="text-sm text-gray-400 mt-2">
                        Found {filteredBlogs.length} result{filteredBlogs.length !== 1 ? 's' : ''} for "{query}"
                    </p>
                )}
            </div>

            {/* Blog Grid */}
            {loading ? (
                <div className="text-center text-gray-400 py-10">Loading blogs...</div>
            ) : filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.map((blog, index) => (
                        <BlogCard 
                            key={blog.id || index}
                            title={blog.title} 
                            excerpt={blog.excerpt} 
                            image={blog.thumbnail} 
                            url={blog.slug}
                            createdAt={blog.createdAt}
                            author={blog.author}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-400 py-10">
                    {query ? `No blogs found matching "${query}"` : "No blogs available"}
                </div>
            )}
        </section>
    );
}

const BlogCard = ({ title, excerpt, image, url, createdAt, author }) => {
    return (
        <div className="w-full bg-gray-600/10 border border-gray-700 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/30">
            {image && (
                <div className="relative w-full aspect-video">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-100 mb-3">
                    {title}
                </h2>

                <p className="text-sm text-gray-400 flex-grow line-clamp-3 mb-4">
                    {excerpt}
                </p>

                {(author || createdAt) && (
                    <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                        {author?.name && (
                            <>
                                <span className="flex items-center gap-1.5">
                                    <span className="size-1.5 rounded-full bg-primary/60" />
                                    {author.name}
                                </span>
                                {createdAt && <span className="text-gray-700">|</span>}
                            </>
                        )}
                        {createdAt && <span>{dateFormat(createdAt)}</span>}
                    </div>
                )}

                <Link href={`/blog/${url}`} className="mt-auto">
                    <Button variant="outline" className="w-full">
                        Read More
                    </Button>
                </Link>
            </div>
        </div>
    );
};