import { CalendarIcon, StepBackIcon, StepBack } from "lucide-react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-poppins",
});

export default function SingleBlog() {

    const tempTags = "Developer Roadmap, Programming Guide, Remote Developer, Fullstack Development, Fullstack Development"
    const tempHtml = `<p> Demo Content </p>`
    return (
        <section className={`${poppins.className} px-4 py-6 flex flex-col justify-center align-middle`}>
            <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
                <div className="flex flex-col items-center gap-3 w-full">
                    <div className="w-full md:w-11/12 lg:w-[95%]">
                        <Image
                            src="/thumbnails/dreams.jpg"
                            width={1200}
                            height={675}
                            className="rounded-2xl w-full h-auto max-h-[320px] sm:max-h-[420px]"
                            alt="dreams"
                        />
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                        <p className="text-sm">
                            Created On :{" "}
                            {new Date().toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center w-full md:w-11/12 lg:w-3/4 px-2">
                        <div className="w-full flex flex-wrap gap-2 items-center justify-center">
                            <h2 className="mr-2 text-sm font-medium">Category:</h2>
                            <div className="flex flex-wrap gap-2 justify-center max-w-full">
                                {tempTags
                                    .split(",")
                                    .map((t) => t.trim())
                                    .filter(Boolean)
                                    .map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-block px-2 py-1 rounded bg-gray-600/60 text-gray-300 border border-gray-400/20 text-xs sm:text-sm truncate hover:whitespace-normal hover:overflow-visible hover:text-clip "
                                            style={{ maxWidth: "10rem" }}
                                            title={tag}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                <article className="px-2 py-6 w-full md:w-11/12 lg:w-3/4 mx-auto break-words">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                        Dream to Be a Remote Developer
                    </h1>

                    <p className="mb-4 text-sm md:text-base leading-relaxed">
                        The dream of becoming a remote developer has grown rapidly in recent
                        years, as more companies embrace flexible work. For aspiring developers,
                        this path is not only about writing code, but also about building
                        independence, discipline, and global opportunities. This guide will walk
                        you through the roadmap to becoming a successful remote developer.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
                        1. Learn the Fundamentals
                    </h2>
                    <p className="mb-4 text-sm md:text-base leading-relaxed">
                        Begin with core programming languages like <strong>JavaScript, Python,
                            or Java</strong>. Understand the basics of data structures, algorithms,
                        and problem solving. Websites like freeCodeCamp and Codecademy are
                        great starting points.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
                        2. Master Web Development
                    </h2>
                    <p className="mb-4 text-sm md:text-base leading-relaxed">
                        Learn <strong>HTML, CSS, and JavaScript</strong> thoroughly. Then, move
                        on to modern frameworks such as <strong>React, Next.js, or Angular</strong>.
                        This will prepare you for most remote frontend roles.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
                        3. Build Real Projects
                    </h2>
                    <p className="mb-4 text-sm md:text-base leading-relaxed">
                        Create portfolio projects that showcase your skills — personal websites,
                        blogs, e-commerce apps, or APIs. Host them on GitHub and deploy them using
                        platforms like Vercel or Netlify.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
                        4. Learn Remote Collaboration Tools
                    </h2>
                    <p className="mb-4 text-sm md:text-base leading-relaxed">
                        Remote work requires effective communication. Familiarize yourself with
                        <strong> Git, GitHub, Slack, Jira, and Zoom</strong>. Practice writing clear
                        documentation and collaborating in teams online.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold mt-6 mb-2">
                        5. Apply and Network
                    </h2>
                    <p className="mb-4 text-sm md:text-base leading-relaxed">
                        Start small with freelance platforms like Upwork or Fiverr, then move toward
                        full-time remote opportunities. Build a strong LinkedIn profile and connect
                        with developers worldwide. Networking often opens doors to hidden remote jobs.
                    </p>

                    <p className="mt-6 text-sm md:text-base leading-relaxed">
                        <strong>Conclusion:</strong> Becoming a remote developer is a journey of
                        continuous learning and adaptation. By mastering technical skills, building
                        real projects, and embracing remote culture, you can achieve the freedom and
                        opportunities that come with this career path.
                    </p>
                </article>
            </div>
        </section>
    )
}