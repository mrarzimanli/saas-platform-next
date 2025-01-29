import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { Plans } from "./app/shared/types/enums";

const ACCESS_SECRET_KEY = new TextEncoder().encode(process.env.ACCESS_SECRET_KEY || "example_access_secret_key");

// Define a type for user plan
type PlanType = `${Plans}`;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  // Handle redirection for the login and signup pages
  if (["/login", "/signup"].includes(request.nextUrl.pathname)) {
    // If the user is authenticated, redirect to the dashboard
    if (token) {
      try {
        const { payload } = await jwtVerify(token, ACCESS_SECRET_KEY);
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (err) {
        console.error("Token verification failed:", err);
      }
    }
    return NextResponse.next();
  }

  // If no token, deny access
  if (!token) {
    if (request.url.includes("/api")) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, ACCESS_SECRET_KEY);

    // Check if the user is accessing the /analytics route
    if (request.nextUrl.pathname.startsWith("/analytics")) {
      const userPlan = (payload as { plan?: PlanType }).plan;

      if (userPlan === Plans.BASIC) {
        console.warn("Access denied: User does not have the pro or enterprise plan.");
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    // Attach user info to the request for downstream processing
    request.headers.set("user", JSON.stringify(payload));
    return NextResponse.next();
  } catch (err) {
    console.error("Token verification error:", err);

    if (err instanceof Error && err.name === "JWTExpired") {
      if (request.url.includes("/api")) {
        return NextResponse.json({ message: "Token has expired. Please refresh your token." }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (request.url.includes("/api")) {
      return NextResponse.json({ message: "Invalid token. Authentication failed." }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard", "/analytics", "/settings"],
};
