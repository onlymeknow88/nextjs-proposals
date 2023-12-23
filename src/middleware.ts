import { deleteCookie } from "cookies-next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Middleware = (request: NextRequest) => NextResponse;

const redirectIfAuthenticated: Middleware = (request) => {
  const authSession = request.cookies.get("access_token")?.value;
  if (authSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

const authenticated: Middleware = (request) => {
  const authSession = request.cookies.get("access_token")?.value;
 

  if (!authSession) {
    const response = NextResponse.redirect(new URL("/404", request.url));
    response.cookies.set({
      name: "redirect",
      value: request.url,
    });
    return response;
  }

  return NextResponse.next();
};


export default function middleware(request: NextRequest) {
 
  // Uncomment if you want to redirect if authenticated.
  if(
    [
      "/404",
      // '/register',
    ].includes(request.nextUrl.pathname)
  ){
    return redirectIfAuthenticated(request);
  }

  if (
    [
      "/",
      "/proposal",
      "/proposal/c",
      "/proposal/e/[id]",
      "/proposal/d/[id]",
      "/proposal/form-noi/[id]",
      "/area",
      "/area/c",
      "/area/e/[id]",
      "/ccow",
      "/ccow/c",
      "/ccow/e/[id]",
      "/budget",
      "/budget/c",
      "/budget/e/[id]",
      "/gl-account",
      "/gl-account/c",
      "/gl-account/e/[id]",
      "/purpay",
      "/purpay/c",
      "/purpay/e/[id]",
      "/form-nop",
      "/form-nop/c",
      "/form-nop/e/[id]",
    ].includes(request.nextUrl.pathname)
  ) {
    return authenticated(request);
  }

  return NextResponse.next();
}
