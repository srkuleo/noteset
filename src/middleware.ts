import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  return withAuth(req);
}

export const config = {
  matcher: [
    "/workouts/:path*",
    "/logs/:paths*",
    "/profile",
    "/workout/:paths*",
    "/workout-created-page",
  ],
};
