import { authMiddleware } from "@clerk/nextjs";
import { PUBLIC_ROUTES } from "./routes";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

const PUBLICS = Object.entries(PUBLIC_ROUTES).map(([_, value]) => {
  let route: string;

  if (typeof value !== "string") {
    route = value();
  } else {
    route = value;
  }
  return route;
});

export default authMiddleware({
  publicRoutes: PUBLICS,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
