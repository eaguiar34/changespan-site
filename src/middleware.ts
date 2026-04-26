import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "changespan_portal_session";

function clearAndRedirect(request: NextRequest) {
  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
  const response = NextResponse.redirect(signInUrl);
  response.cookies.delete(COOKIE_NAME);
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/portal")) {
    return NextResponse.next();
  }
  const session = request.cookies.get(COOKIE_NAME)?.value;
  if (!session) return clearAndRedirect(request);
  try {
    const parsed = JSON.parse(decodeURIComponent(session));
    if (!parsed?.userId || !parsed?.role) return clearAndRedirect(request);
  } catch {
    return clearAndRedirect(request);
  }
  const response = NextResponse.next();
  response.headers.set("x-changespan-portal-guard", "active");
  return response;
}

export const config = { matcher: ["/portal/:path*"] };
