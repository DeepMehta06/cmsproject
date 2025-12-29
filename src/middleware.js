import { NextResponse } from "next/server";
import { rateLimit } from "./utils/rateLimits";

export async function middleware(request){

    const allowedOrigins = ['https://localhost:3000', 'https://stratuscms.netlify.app/']
    if(request.method === 'POST'){
        
        const origin = request.headers.get('origin');
        if(allowedOrigins.includes(origin)){
            return NextResponse.json({message : "CUnauthorized domain"}, {status : 403});
        }

        let ip = request.ip || request.headers.get("x-forwarded-for") || 'unknown';
        const {limit, remaining, reset} =await rateLimit.limit(ip);
        if(remaining==0) return NextResponse.json({message : "You have reached the request limit"}, {status : 491})
        console.log(limit, remaining, 'limit and remaining')
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/api/v1/:path'
}