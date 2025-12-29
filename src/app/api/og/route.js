import { Icons } from "@/components/Icons";
import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const rawTitle = searchParams.get('title') || "Default Title"; 
        const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

        return new ImageResponse(
            (
                <div 
                    tw="flex flex-col w-full h-full justify-between p-0"
                    style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                        fontFamily: 'Inter',
                    }}
                >
                    {/* Header with Logo */}
                    <div tw="flex items-center px-16 pt-12">
                        <div tw="flex items-center">
                            <Icons.BlogCustomIcon size={60} />
                            <span tw="ml-4 text-3xl font-bold text-white">Stratus</span>
                        </div>
                    </div>

                    {/* Main Title */}
                    <div tw="flex flex-col px-16 pb-8">
                        <h1 
                            tw="text-7xl font-bold mb-4 leading-tight"
                            style={{
                                backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #94a3b8 100%)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                maxWidth: '1000px',
                            }}
                        >
                            {title}
                        </h1>
                        
                        {/* Footer */}
                        <div tw="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '2px solid #334155' }}>
                            <p tw="text-2xl text-slate-400">
                                Powered by Stratus Blog
                            </p>
                            <div tw="flex items-center text-slate-400 text-xl">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 17l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span tw="ml-2">stratus.blog</span>
                            </div>
                        </div>
                    </div>
                </div>
            ), 
            {
                width: 1200,
                height: 630,
            }
        )
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to generate the OG image" }, { status: 500 });
    }
}