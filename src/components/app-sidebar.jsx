import { Book, Calendar, Home, NotebookPen, Search, Settings, User2 } from "lucide-react"
import { Josefin_Sans } from "next/font/google"

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-josefins_sans",
});

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Blogs", url: "/blogs", icon: Book },
  { title: "Drafts", url: "/draft", icon: Calendar },
  { title: "Your Posts", url: "/userPost", icon: NotebookPen },
  { title: "Settings", url: "#", icon: Settings },
]

const adminItems = [
  { title: "All Users", url: "/user", icon: User2 },
  { title: "All Posts", url: "/posts", icon: Book },
]

export default async function AppSidebar() {
  const session = await getServerSession(authOptions);
  const adminCheck = await isAdmin(session);

  return (
    <>
      {session?.user ? (
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className={josefin.className}>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
              {adminCheck ? (
                <>
                  <SidebarGroupLabel>Admin</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu className={josefin.className}>
                      {adminItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <a href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </>
              ) : null}
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      ) : null}
    </>
  );
}