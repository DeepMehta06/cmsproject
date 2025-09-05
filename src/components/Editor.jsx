"use client";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { Poppins } from "next/font/google";
import { useState } from "react";
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { slugify } from "slugmaster";
import ImageUpload from "./ogImage";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function Editor({ onSave }) {
    const { register, handleSubmit } = useForm();
    const [content, setContent] = useState("");
    const [ogImage, setOgImage] = useState("");
    const handleForm = (data) => {
        console.log({
            ...data,
            content,
        });
        const generatedSlug = slugify(data.title)
        onSave({...data, content, slug:generatedSlug, ogImage})
    };

    const BASE_TOOLBAR = [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
        ['image'],
        ['code-block']
    ];

    return (
        <section className={poppins.className}>
            <form
                className="flex flex-col space-y-4 mb-3"
                onSubmit={handleSubmit(handleForm)}
            >
                <input
                    type="text"
                    placeholder="Enter a title..."
                    className={`font-semibold text-xl bg-zinc-600 px-3 py-2 rounded-md mx-10 ${poppins.className}`}
                    {...register("title", { required: true })}
                />

                <input
                    type="text"
                    placeholder="Enter the excerpt..."
                    className={`font-semibold text-xl bg-zinc-600 px-3 py-2 rounded-md mx-10 ${poppins.className}`}
                    {...register("excerpt", { required: true })}
                />

                <input
                    type="text"
                    placeholder="Enter the category..."
                    className={`font-semibold text-xl bg-zinc-600 px-3 py-2 rounded-md mx-10 ${poppins.className}`}
                    {...register("category", { required: true })}
                />

                <ReactQuill value={content}
                    onChange={setContent}
                    modules={{
                        toolbar: BASE_TOOLBAR
                    }}
                    formats={[
                        "header",
                        "font",
                        "size",
                        "bold",
                        "italic",
                        "underline",
                        "list",
                        "link",
                        "image",
                        "code-block"
                    ]}
                    className={`px-3 py-2 rounded-md mx-7`} />
                <ImageUpload returnImage ={ setOgImage }/>
                <input
                    type="text"
                    placeholder="Enter the meta-data..."
                    className={`font-semibold text-xl bg-zinc-600 px-3 py-2 rounded-md mx-10 my-3 ${poppins.className}`}
                    {...register("metaDescription", { required: false })}
                />
                <input
                    type="text"
                    placeholder="Enter some keywords..."
                    className={`font-semibold text-xl bg-zinc-600 px-3 py-2 rounded-md mx-10 ${poppins.className}`}
                    {...register("keywords", { required: false })}
                />

                <div className="flex items-center gap-4 mx-10">
                    <select
                        {...register("status")}
                        className={`bg-zinc-700 text-white font-semibold text-lg px-4 py-2 rounded-md ${poppins.className}`}
                    >
                        <option value="draft">Draft</option>
                        <option value="publish">Publish</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-zinc-700 text-white font-semibold text-lg px-4 py-2 rounded-md hover:bg-zinc-600 transition-colors"
                    >
                        Save
                    </button>
                </div>

            </form>
        </section>
    );
}
