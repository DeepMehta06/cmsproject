"use client"; 

import dateFormat from "@/utils/dateFormat";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function EditableBlogCards({ posts }) {
    const router = useRouter();
    const [currentStatus, setCurrentStatus] = useState(posts.status);
    const [isDeleting, setIsDeleting] = useState(false);

    const endpoint = "/api/v1/state";

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this?")) return;
        
        try {
            const res = await fetch(`/api/v1/delete/${posts.id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setIsDeleting(true); 
                router.refresh();
            }
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            const res = await fetch(endpoint, {
                method: "PATCH",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ id: posts.id, status: newStatus })
            });

            if (res.ok) {
                setCurrentStatus(newStatus);
                router.refresh();
            } else {
                console.error("Failed to update status. Status code:", res.status);
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    if (isDeleting) return null;

    return (
        <div className="flex w-full">
            <div className="bg-gray-600/20 p-3 rounded-lg w-full flex gap-3 flex-col sm:justify-between sm:flex-row items-center border border-transparent hover:border-gray-500 transition-all">
                <div className="flex-1">
                    <h2 className="font-bold text-lg">{posts.title}</h2>
                    <p className="text-sm text-gray-300 line-clamp-1">
                        {posts.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        {posts.author?.image && (
                            <Image 
                                src={posts.author.image} 
                                alt={posts.author.name || "Author"} 
                                width={24} 
                                height={24} 
                                className="rounded-full"
                            />
                        )}
                        <span className="text-xs text-gray-400">
                            {posts.author?.name || "Unknown Author"} • {dateFormat(posts.createdAt)}
                        </span>
                    </div>
                </div>
                
                <div className="flex gap-2 items-center">
                    {currentStatus === "PUBLISHED" ? (
                        <Button onClick={() => handleStatusChange("DRAFT")} variant="outline">
                            Convert to Draft
                        </Button>
                    ) : (
                        <Button onClick={() => handleStatusChange("PUBLISHED")}>
                            Publish
                        </Button>
                    )}

                    <Button onClick={() => router.push(`/draft/${posts.slug}`)} variant="outline">
                        Edit
                    </Button>

                    {currentStatus === "PUBLISHED" && (
                        <Button onClick={() => router.push(`/blog/${posts.slug}`)} variant="secondary">
                            View
                        </Button>
                    )}

                    <div className="pl-2 border-l border-gray-700 ml-2">
                        <Trash 
                            onClick={handleDelete} 
                            className="size-5 text-gray-400 cursor-pointer hover:text-red-500 transition-all active:scale-90" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}