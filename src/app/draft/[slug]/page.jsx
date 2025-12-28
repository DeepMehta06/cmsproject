'use client';

import { Poppins } from "next/font/google";
import Editor from "@/components/Editor";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-poppins",
});

export default function updateDraft({ params }) {
    const [slug, setSlug] = useState(null);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const resolveParams = async () => {
            const resolvedParams = await params;
            setSlug(resolvedParams.slug);
        };
        resolveParams();
    }, [params]);

    useEffect(() => {
        const fetchPost = async () => {
            // Ensure slug exists before fetching
            if (!slug) {
                console.log("Waiting for slug...");
                return;
            }

            // FIX: The slug is now correctly included in the URL
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update/${slug}`);

            if (!res.ok) {
                // This 'if' block now correctly handles real API errors, not 404s
                const errorData = await res.json().catch(() => ({ message: "An unknown error occurred" }));
                if (res.status === 403) {
                    toast.error("You are not the author", {
                        description: errorData.message || "Sorry, only the post author can edit the post",
                    });
                } else {
                    toast.error("Uh-Ohhh...", {
                        description: errorData.message || "Unable To Load Your Post",
                    });
                }
                return; 
            }
            
            const data = await res.json();
            console.log(data)
            setPost(data);
        }
        fetchPost();
    }, [slug]);

    const savePost = async ({ title, content, excerpt, metaDescription, keywords, slug, ogImage, status, category }) => {
        console.log(title, content, excerpt, metaDescription, keywords, slug, ogImage, status, category)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update/${slug}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, excerpt, metaDescription, keywords, ogImage, status })
        })
        if (!res.ok) {
            const errorText = await res.text();
            console.log("API error:", res.status, errorText);
            throw new Error(`Post Saving Failed: ${res.status}`);
        }
    }

    return <div className="flex flex-col gap-3">
        <h1 className={`font-semibold text-2xl px-3 py-2 mx-8 font-${poppins.className}`}>Create A New Post</h1>
        <Editor onSave={savePost} initialData = {post}/>
    </div>
}
