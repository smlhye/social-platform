import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/sign-in", "/sign-up", "/forgot-password"];

export function middleware(req: NextRequest) {
    const accessToken = req.cookies.get("ACCESS_TOKEN")?.value;
    const refreshToken = req.cookies.get("REFRESH_TOKEN")?.value;
    const pathname = req.nextUrl.pathname;

    const isAuthPage = AUTH_ROUTES.includes(pathname);

    if ((accessToken || refreshToken) && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api|favicon.ico|images).*)"],
};
