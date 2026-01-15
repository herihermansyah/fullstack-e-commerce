import NextAuth from "next-auth";
import authConfig from "./auth.config";

const {auth} = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user.role;
  const {pathname} = req.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (!isLoggedIn && !isAuthPage) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  if (isLoggedIn) {
    if (isAuthPage) {
      const target = role === "ADMIN" ? "/admin" : "/";
      return Response.redirect(new URL(target, req.nextUrl));
    }

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return Response.redirect(new URL("/", req.nextUrl));
    }
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
