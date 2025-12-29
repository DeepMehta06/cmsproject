"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { Poppins } from "next/font/google";
import { useEffect, useState, useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { slugify } from "slugmaster";
import ImageUpload from "./ogImage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import z from "zod";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import AIContent from "@/utils/ai-content";
import { Sparkle, Wand2, FileText, Code } from "lucide-react";
import { marked } from 'marked';


const schema = z.object({
    title: z.string().min(10, { message: 'Title must container 5 or more characters' }),
    excerpt: z.string().min(10, { message: "Excerpt shall have minimum of 10 characters, please enter some details" }),
    category: z.string().min(1, { message: "Blog shall have minimum of 1 category, please enter a category" }),
    keywords: z.string().min(1, { message: "Blog shall have minimum of 1 keyword, please enter a keyword" }),
    status: z.enum(["draft", "publish"]),
    metaDescription: z.string().optional()
})

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
);

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function Editor({ onSave, initialData }) {
    const { register, handleSubmit, setValue } = useForm();
    const [content, setContent] = useState("");
    const [ogImage, setOgImage] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [editorMode, setEditorMode] = useState("rich"); // "rich" or "markdown"
    const router = useRouter();
    const ideaRef = useRef(null);
    const closeDialogRef = useRef(null);
    const quillRef = useRef(null);

    
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
        try {
            const generatedSlug = initialData ? initialData.slug : slugify(data.title);

            const status = data.status === "publish" ? "PUBLISHED" : "DRAFT";

            onSave({ ...data, content, slug: generatedSlug, ogImage, status });

            toast("title", {
                description: initialData ? "Your Blog Post is Updated" : "Your Blog Is Published",
            });

            if (status === "PUBLISHED") router.push(`/blog/${generatedSlug}`);
        }
        catch (error) {
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

    const handleSelectionChanged = () => {
        const selection = quillRef?.current?.getEditor().getSelection();
        console.log(selection, 'selection');
        setIsSelected(selection && selection.length > 0);
    }

    const handleGenerateContentUsingAI = async () => {
        try {
            const promptText = ideaRef.current?.value;

            if (!promptText) {
                toast.error("Error", {
                    description: "Please enter a topic or idea first"
                });
                return;
            }

            toast.info("Generating...", {
                description: "AI is generating your content"
            });

            const res = await AIContent({
                text: promptText,
                customInstruction: 'Generate a comprehensive, well-structured blog post based on the following topic or idea. The content should be: Informative and engaging, Written in a professional yet accessible tone, Include clear headings and subheading, Contain relevant examples or explanations, Be between 800-1000 words, SEO-friendly with natural keyword usage',
                contentGeneration: true
            });

            if (res) {
                // If in Rich Text mode, convert markdown to HTML
                if (editorMode === "rich") {
                    const htmlContent = marked.parse(res);
                    setContent(htmlContent);
                } else {
                    // In Markdown mode, use raw markdown
                    setContent(res);
                }
                
                toast.success("Success", {
                    description: "Content generated successfully!"
                });
                closeDialogRef.current?.click();
            }
        } catch (error) {
            console.error("AI Generation failed:", error);
            toast.error("Error", {
                description: "Failed to generate content. Please try again."
            });
        }
    };

    const handleRewriteContentUsingAI = async () => {
        try {
            const editor = quillRef?.current?.getEditor();
            const selection = editor?.getSelection();
            
            if (!selection || selection.length === 0) {
                toast.error("Error", {
                    description: "Please select some text to rewrite"
                });
                return;
            }

            const selectedText = editor.getText(selection.index, selection.length);

            if (!selectedText.trim()) {
                toast.error("Error", {
                    description: "Selected text is empty"
                });
                return;
            }

            toast.info("Rewriting...", {
                description: "AI is rewriting your selected content"
            });

            const res = await AIContent({
                text: selectedText,
                customInstruction: 'Rewrite this content to be more engaging, clear, and professional while maintaining the original meaning. Improve the flow and readability.',
                contentGeneration: false
            });

            if (res) {
                // Replace the selected text with AI-generated content
                editor.deleteText(selection.index, selection.length);
                editor.clipboard.dangerouslyPasteHTML(selection.index, res);
                
                toast.success("Success", {
                    description: "Content rewritten successfully!"
                });
            }
        } catch (error) {
            console.error("AI Rewrite failed:", error);
            toast.error("Error", {
                description: "Failed to rewrite content. Please try again."
            });
        }
    };

    return (
        <section className={poppins.className}>
            <form
                className="flex flex-col space-y-4 mb-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await schema.parseAsync(data);
                        handleForm(data)
                    } catch (error) {
                        console.log(error.message)
                        if (error instanceof z.ZodError) {
                            error.issues.forEach(element => {
                                toast.error("Error", {
                                    description: `${element.message}`,
                                    variant: "destructive"
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

                {/* Editor Mode Toggle */}
                <div className="flex gap-2 mx-10 mb-4">
                    <Button
                        type="button"
                        variant={editorMode === "rich" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setEditorMode("rich")}
                        className="flex gap-2 items-center"
                    >
                        <FileText className="w-4 h-4" />
                        Rich Text
                    </Button>
                    <Button
                        type="button"
                        variant={editorMode === "markdown" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setEditorMode("markdown")}
                        className="flex gap-2 items-center"
                    >
                        <Code className="w-4 h-4" />
                        Markdown
                    </Button>
                </div>

                {/* Conditional Editor Rendering */}
                {editorMode === "rich" ? (
                    <ReactQuill
                        ref={quillRef}
                        value={content}
                        onChange={setContent}
                        onChangeSelection={handleSelectionChanged}
                        modules={{
                            toolbar: BASE_TOOLBAR
                        }}
                        formats={[
                            "header", "font", "size", "bold", "italic", "underline",
                            "list", "link", "image", "code-block"
                        ]}
                        className={`px-3 py-2 rounded-md mx-7`}
                    />
                ) : (
                    <div className="mx-10 mb-4" data-color-mode="dark">
                        <MDEditor
                            value={content}
                            onChange={setContent}
                            preview="live"
                            height={500}
                            visibleDragbar={false}
                            highlightEnable={true}
                        />
                    </div>
                )}
                
                <div className="flex gap-3 m-10 ">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="flex gap-2 items-center">
                                            <Wand2 className="w-4 h-4" />
                                            Generate with AI
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[525px]">
                                        <DialogHeader>
                                            <DialogTitle>Generate with AI</DialogTitle>
                                            <DialogDescription>
                                                Describe the topic or idea you want to create content about.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <textarea 
                                            ref={ideaRef} 
                                            rows={10} 
                                            placeholder="E.g., Write about the benefits of meditation..."
                                            className="bg-zinc-800/20 p-3 border border-zinc-700 rounded-lg outline-none scrollbar-hide resize-none focus:ring-2 focus:ring-zinc-600"
                                        />
                                        <DialogFooter>
                                            <DialogClose asChild ref={closeDialogRef}>
                                                <Button variant="ghost">Cancel</Button>
                                            </DialogClose>
                                            <Button onClick={handleGenerateContentUsingAI}>
                                                <Sparkle className="w-4 h-4 mr-2" />
                                                Generate
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Create new content from scratch using AI</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {isSelected && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button 
                                        variant="outline" 
                                        className="flex gap-2 items-center"
                                        onClick={handleRewriteContentUsingAI}
                                        type="button"
                                    >
                                        <Sparkle className="w-4 h-4" />
                                        Rewrite with AI
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Improve and rewrite your selected text using AI</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>

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