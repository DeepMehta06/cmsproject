import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Inter, Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-poppins",
});

const fetchAllBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get/`)
    const data = await res.json();
    // console.log(data);
    return data
}

export default async function Blogs() {
    const blogData = await fetchAllBlogs()
    return (
        <section className={`grid grid-cols-2 gap-4 md:grid-cols-3 p-3 ${poppins.className}`}>
            {
                blogData.map((blog, index) => {
                    return <BlogCards title={blog.title} excerpt={blog.excerpt} image={blog.thumbnail} url={blog.slug} key={index} />
                })
            }
        </section>
    )
}

const BlogCards = ({ title, excerpt, image, url }) => {
    console.log(url)
    return (
        <div className="w-full max-w-sm mx-auto bg-gray-600/10 border border-gray-700 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/30">
            {image && (
                <div className="relative w-full aspect-video">
                    <Image
                        src={image}
                        alt={title}
                        layout="fill"
                        className="object-cover"
                    />
                </div>
            )}

            <div className="p-6 flex flex-col flex-grow items-center text-center">

                <h1 className="text-xl font-semibold text-gray-100">
                    {title}
                </h1>

                <p className="mt-3 text-sm text-gray-400 flex-grow line-clamp-3">
                    {excerpt}
                </p>

                <div className="mt-auto pt-5">
                    <Link href={`/blog/${url}`}>
                        <Button variant={"outline"}>Read More</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}