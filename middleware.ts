import { authMiddleware } from "@clerk/nextjs";
import * as _ from "lodash";
import { BROWSE_ROUTES } from "./routes/browse";
import { API_ROUTES } from "./routes/api";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
const PUBLIC_ROUTES = {
  ...API_ROUTES.PUBLIC,
  ...BROWSE_ROUTES.PUBLIC,
};

const PUBLICS = Object.entries(PUBLIC_ROUTES).map(([_, value]) => {
  let route: string;

  if (typeof value !== "string") {
    route = value();
  } else {
    route = value;
  }
  return route;
});

console.log(PUBLICS);

export default authMiddleware({
  publicRoutes: PUBLICS,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
