import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Inter, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const blogContents = [
    {
        "title": "React V/S Next",
        "excerpt": "React is a flexible UI library. Next.js is a framework on top of React .....",
        "image": "/thumbnails/react_v_next.png",
        "url": "/demo-slug"
    },
    {
        "title": "Dream to be a remote developer",
        "excerpt": "A perfect roadmap for you to get job as a remote developer.....",
        "image": "/thumbnails/dreams.jpg",
        "url": "/demo-slug"
    },
    {
        "title": "Roadmap for BackEnd  Devs",
        "excerpt": "A complete guide for you to become a backend developer.....",
        "image": "/thumbnails/backend_dev.png",
        "url": "/demo-slug"
    }
]

export default function Blogs() {
    return (
        <section className={`grid grid-cols-2 gap-4 md:grid-cols-3 p-3 ${poppins.className}`}>
        {
            blogContents.map((blog, index) => {
                return <BlogCards title={blog.title} excerpt ={blog.excerpt} image={blog.image} url={blog.url} key={index} />
            })
        }
        </section>
    )
}

const BlogCards = ({title, excerpt, image, url}) => {
    return (
        <div className = "bg-gray-600/10 flex flex-col justify-center items-center rounded-2xl hover:scale-105 transition-all delay-100 duration-300">
            <Image src={image} width={350} height={170} alt={title} style={{ objectFit: 'cover' }} className="rounded-xl p-2"/>
            <div className="grid grid-rows-3">
            <h1 className="p-2 text-center text-xl font-semibold">{title}</h1>
            <p className="p-2 text-center text-sm text-gray-400">{excerpt}</p>
            <Link href={`/blog/${url}`} className="p-4 text-center">
                <Button variant={"outline"}>Read More</Button>
            </Link>
            </div>
        </div>
    )
}