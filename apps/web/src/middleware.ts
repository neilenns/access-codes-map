import { SessionData } from "@auth0/nextjs-auth0/types";
import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";

// This has to be done using process.env instead of the zod-parsed ENV as it
// runs in a separate runtime just for middleware.
const authDisabled =
  process.env.NODE_ENV === "development" && process.env.DISABLE_AUTH === "true";

// This method of protecting routes comes from https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#middleware
export async function middleware(request: NextRequest) {
  let authorizationResponse: NextResponse;

  // Check for disabled authentication in development environment.
  if (authDisabled) {
    console.warn("DISABLE_AUTH is true, authentication is disabled.");
    return NextResponse.next();
  }

  try {
    authorizationResponse = await auth0.middleware(request);
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authorizationResponse;
  }

  if (!request.nextUrl.pathname.startsWith("/map")) {
    return authorizationResponse;
  }

  let session: SessionData | null;

  try {
    session = await auth0.getSession(request);
  } catch (error) {
    console.error("Error getting session:", error);
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  if (!session || !session.tokenSet.accessToken) {
    // The user isn't authenticated so redirect to the login page
    return NextResponse.redirect(
      new URL(
        `/auth/login?returnTo=${encodeURIComponent(request.nextUrl.pathname)}`,
        request.nextUrl.origin,
      ),
    );
  }

  // This ensures the access token is refreshed and available to server actions.
  // https://github.com/auth0/nextjs-auth0/issues/1520#issuecomment-1778965382
  try {
    await auth0.getAccessToken(request, authorizationResponse);
  } catch (error) {
    console.error("Error refreshing access token:", error);
    // Failed to refresh the access token so redirect to login page.
    return NextResponse.redirect(
      new URL(
        `/auth/login?returnTo=${encodeURIComponent(request.nextUrl.pathname)}`,
        request.nextUrl.origin,
      ),
    );
  }

  // The headers from the auth middleware should always be returned
  return authorizationResponse;
}
