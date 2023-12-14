import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse, type NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  if (
    req.url === "http://localhost:3000/" ||
    req.url === "https://noteset.vercel.app/"
  ) {
    return NextResponse.redirect(new URL("/landing", req.url));
  } else {
    return withAuth(req);
  }
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|site|shortcut-icon|landing|noteset-og-image|apple|manifest).*)",
  ],
};
