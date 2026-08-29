import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as any)?.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = ["/", "/login", "/register"].includes(nextUrl.pathname);
  const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect to respective dashboard if already logged in
      if (role === "ADMIN") return NextResponse.redirect(new URL("/admin/dashboard", nextUrl));
      if (role === "RECRUITER") return NextResponse.redirect(new URL("/recruiter/dashboard", nextUrl));
      return NextResponse.redirect(new URL("/student/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Role-based protection
  if (nextUrl.pathname.startsWith("/student") && role !== "STUDENT") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  if (nextUrl.pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  if (nextUrl.pathname.startsWith("/recruiter") && role !== "RECRUITER") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
