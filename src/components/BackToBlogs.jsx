"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackToBlogsLink() {
  const pathname = usePathname();

  if (pathname === "/blogs" || pathname==="/") return null;

  return (
    <Link href="/blogs" className="px-3 py-1 text-sm hover:underline">
      Back to Blogs
    </Link>
  );
}
