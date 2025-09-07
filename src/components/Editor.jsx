"use client";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import { slugify } from "slugmaster";
import ImageUpload from "./ogImage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from 'zod'

const schema = z.object ({
    title : z.string().min(10, {message : 'Title must container 5 or more characters'}),
    excerpt : z.string().min(10, {message:"Excerpt shall have minimum of 10 characters, please enter some details"}),
    category : z.string().min(1, {message:"Blog shall have minimum of 1 category, please enter a category"}),
    keywords : z.string().min(1, {message:"Blog shall have minimum of 1 keyword, please enter a keyword"}),
    status : z.enum(["draft", "publish"]),
    metaDescription : z.string().optional()
})
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function Editor({ onSave, initialData }) {
    const { register, handleSubmit, setValue } = useForm();
    const [content, setContent] = useState("");
    const [ogImage, setOgImage] = useState("");
    const router = useRouter();
    useEffect(() => {
        if (initialData) {
            setValue('title', initialData.title);
            setValue('keywords', initialData.keywords);
            setValue('excerpt', initialData.excerpt);
            setValue('category', initialData.catSlug);
            setContent(initialData.content || "");
            setValue('status', initialData.status === 'PUBLISHED' ? 'publish' : 'draft');
            setValue('metaDescription', initialData.desc)
            if (initialData.thumbnail) {
                setOgImage(initialData.thumbnail)
            }
        }
    }, [initialData, setValue]);

    const handleForm = (data) => {
        try{
        const generatedSlug = initialData ? initialData.slug : slugify(data.title);

        const status =data.status === "publish" ? "PUBLISHED" : "DRAFT";

        onSave({ ...data, content, slug: generatedSlug, ogImage, status });

        toast("title", {
            description: initialData ? "Your Blog Post is Updated" : "Your Blog Is Published",
        });

        if (status === "PUBLISHED") router.push(`/blog/${generatedSlug}`);
    }
    catch(error) {
        console.log(error.message);
    }
    };


    const BASE_TOOLBAR = [
        [{ header: "1" }, { header: "2" }, { header: "3" }],
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
                onSubmit={handleSubmit(async(data) => {
                    try{
                        await schema.parseAsync(data);
                        handleForm(data)
                    }catch(error){
                        console.log(error.message)
                        if(error instanceof z.ZodError){
                            error.issues.forEach(element => {
                                toast.error("Error", {
                                    description : `${element.message}`,
                                    variant : "destructive"
                                })
                            });
                        } else {
                            console.error(error)
                        }
                    }
                })}
            >
                <input
                    type="text"
                    placeholder="Enter a title..."
                    className={`font-semibold text-xl bg-zinc-600 px-3 py-2 rounded-md mx-10 ${poppins.className}`}
                    {...register("title")}
                />

                <input
                    type="text"
                    placeholder="Enter the excerpt..."
                    className={`font-semibold text-xl bg-zinc-600 px-3 py-2 rounded-md mx-10 ${poppins.className}`}
                    {...register("excerpt")}
                />

                <input
                    type="text"
                    placeholder="Enter the category..."
                    className={`font-semibold text-xl bg-zinc-600 px-3 py-2 rounded-md mx-10 ${poppins.className}`}
                    {...register("category")}
                />

                <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={{
                        toolbar: BASE_TOOLBAR
                    }}
                    formats={[
                        "header", "font", "size", "bold", "italic", "underline",
                        "list", "link", "image", "code-block"
                    ]}
                    className={`px-3 py-2 rounded-md mx-7`}
                />

                <ImageUpload returnImage={setOgImage} preLoadedImage={ogImage} />

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