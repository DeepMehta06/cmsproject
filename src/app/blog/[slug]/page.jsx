// 'use client';

import dateFormat from "@/utils/dateFormat";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

const fetchSingleBlog = async (slug) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get/${slug}`;
    console.log(`Fetching from this exact URL: ${url}`);

    const res = await fetch(url, { cache: 'no-store' });
    if(res.status === 404) {
        notFound();
    }

    const data = await res.json();
    return data;
};

export async function generateMetaData({params}){
    const { slug } = params
    const res = await fetchSingleBlog(slug)

    return {
        title: res.title,
        description: res.excerpt,
        openGraph: {
        images: res.thumbnail ? [res.thumbnail] : [`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${res.title}`]
        }
    }
}

export default async function SingleBlog({ params }) {
    const { slug } = await params; 
    const {
        id,
        title,
        content,
        thumbnail,
        desc,
        keywords,
        excerpt,
        catSlug,
        createdAt,
        authorId,
        status,
        authorName,
        authorImage
    } = await fetchSingleBlog(slug);

    return (
        <main className="bg-gray-900/50 backdrop-blur-lg text-white w-full px-4 py-8 md:py-12">
            <article className="max-w-6xl mx-auto flex flex-col items-center gap-y-6">

                {/* 1. Blog Post Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-100">
                    {title}
                </h1>

                {/* 3. Thumbnail Image */}
                {thumbnail && (
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-auto rounded-lg border border-gray-700 object-cover aspect-video shadow-lg"
                    />
                )}

                {/* 2. Combined Metadata Section */}
                {/* This new container now holds all metadata, including the tags. */}
                <div className="flex flex-col items-center gap-y-4">
                    {/* Author, Date, and Category */}
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-400">
                        <a href={`/user/${authorId}`} className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                            {authorImage && (
                                <img
                                    src={authorImage}
                                    width="24"
                                    height="24"
                                    alt={authorName}
                                    className="rounded-full border-2 border-gray-600"
                                />
                            )}
                            <span>{authorName}</span>
                        </a>

                        <div className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            <span>{dateFormat(createdAt)}</span>
                        </div>

                        <div className="bg-sky-800/20 border border-sky-700/50 text-sky-300 px-3 py-1 rounded-full text-xs font-medium">
                            {catSlug}
                        </div>
                    </div>

                    {/* Keywords/Tags Section - MOVED HERE */}
                    {keywords && (
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {keywords.split(",").map((tag, idx) => (
                                <p key={`${tag}_${idx}`} className="text-xs bg-gray-600/30 border border-gray-700 w-fit px-2 py-1 rounded-md">
                                    {tag.trim()}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                {/* 4. Blog Content */}
                <div
                    className="prose prose-lg prose-invert max-w-none w-full text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

            </article>
        </main>
    );
}
