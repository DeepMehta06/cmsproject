import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Layers2, Layers3, NotebookPen, Pencil, TypeOutline, ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Stratus",
  description: "Manage your content with ease",
};

export default function Home() {
  return (
    <main className="w-full">
      <section className="flex flex-col items-center-safe justify-center-safe w-full h-[50vh] sm:h-[70vh] md:h-[80vh] lg:h-[80vh] gap-5">
        <h1 className={`${poppins.className} text-5xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mx-1`}>Welcome to Stratus</h1>
        <div className="flex flex-col items-center-safe justify-center-safe w-full gap-2">
          <h1 className={`${poppins.className} text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mx-1`}>From Ideas to Impact—Fast.</h1>
          <p className={`${poppins.className} mx-1 text-center`}>Seamless workflows, smarter publishing, and infinite scalability.</p>
        </div>
        <div className="flex flex-row gap-5 justify-center items-center">
          <Link href="/blogs">
            <Button variant={"outline"} className={"hover:bg-gray-500 transition-all duration-200"}>Try it out</Button>
          </Link>
          <Button>Learn More</Button>
        </div>
      </section>
      <section className="min-h-[50vh] sm:min-h-[50vh] bg-gray-600/10 flex justify-center items-center px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 mx-3">
          <div className="flex flex-col items-center text-center h-full">
            <NotebookPen size={50} className="text-blue-400 mb-3" />
            <h3 className={`${poppins.className} font-semibold text-gray-100 text-xl`}>
              Intuitive Editor
            </h3>
            <p className={`${poppins.className} text-gray-400 w-[80%]`}>
              Create and edit content effortlessly with a clean, intuitive interface designed for focus and creativity.
            </p>
          </div>
          <div className="flex flex-col items-center text-center h-full">
            <Layers3 size={50} className="text-green-400 mb-3" />
            <h3 className={`${poppins.className} font-semibold text-gray-100 text-xl`}>
              Flexible Workflows
            </h3>
            <p className={`${poppins.className} text-gray-400 w-[80%]`}>
              Organize, structure, and collaborate seamlessly across teams and projects.
            </p>
          </div>
          <div className="flex flex-col items-center text-center h-full">
            <ZapIcon size={50} className="text-yellow-400 mb-3" />
            <h3 className={`${poppins.className} font-semibold text-gray-100 text-xl`}>
              Lightning Fast Publishing
            </h3>
            <p className={`${poppins.className} text-gray-400 w-[80%]`}>
              Publish your content instantly across channels with just one click.
            </p>
          </div>
        </div>
      </section>
      <section className="min-h-[50vh] sm:min-h-[50vh] flex justify-center items-center py-4">
        <div className={`flex flex-col justify-center-safe items-center-safe ${poppins.className} gap-3`}>
        <h4 className="text-2xl font-bold text-center">Ready to Transform Your Content Writing Journey ?</h4>
        <p className="text-xl font-medium text-center">Join Thousands of content writers on Stratus</p>
        <div className="flex gap-3 justify-center items-center">
        <input className="bg-zinc-700 px-3 py-2 text-center rounded-xl focus:outline-1 focus:outline-gray-400" placeholder="Enter Your Email"></input>
        <Button className={"rounded-xl"}>Join Now</Button>
        </div>
        </div>
      </section>
    </main>
  );
}
