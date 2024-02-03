import { is } from "drizzle-orm";
import { auth } from "./auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "./routes";

export default auth((req) => {
  const isLoggedIn = Boolean(req.auth);
  const route = req.nextUrl.pathname;
  const { nextUrl } = req;

  const isApiAuthRoute = route.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(route);
  const isAuthRoute = authRoutes.includes(route);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    return isLoggedIn
      ? Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      : null;
  }

  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
