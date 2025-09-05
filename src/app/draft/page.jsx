"use client"
import Editor from "@/components/Editor"
import { Poppins } from "next/font/google";

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-poppins",
});

export default function Draft() {
    const savePost = async ({ title, content, excerpt, metaDescription, keywords, slug, ogImage, status, category }) => {
        console.log(title, content, excerpt, metaDescription, keywords, slug, ogImage, status, category)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, excerpt, metaDescription, keywords, slug, ogImage, status, category })
        })
        if (!res.ok) {
            const errorText = await res.text();
            console.log("API error:", res.status, errorText);
            throw new Error(`Post Saving Failed: ${res.status}`);
        }
    }

    return <div className="flex flex-col gap-3">
        <h1 className={`font-semibold text-2xl px-3 py-2 mx-8 font-${poppins.className}`}>Create A New Post</h1>
        <Editor onSave={savePost} />
    </div>
}