import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = Boolean(req.auth);
  const route = req.nextUrl.pathname;
  console.log({ isLoggedIn, route });
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
