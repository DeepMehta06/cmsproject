import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import ShaderBackground from '@/components/lightswind/shader-background';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Stratus",
  description: "Manage your content with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${poppins.variable}antialiased`}
      >
        <AuthProvider>
          <ShaderBackground>
            <SidebarProvider>
              <AppSidebar />
              <main className="w-full">
                <Navbar />
                {children}
                <Toaster />
              </main>
            </SidebarProvider>
          </ShaderBackground>
        </AuthProvider>
      </body>
    </html>
  );
}
