import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * When MAINTENANCE_MODE=1, the public site returns an offline page.
 * Unset / set to 0 on Vercel to restore access.
 */
export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "1") {
    return NextResponse.next();
  }

  // Allow Next internals and static assets so the offline page can load
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname === "/icon.png" ||
    pathname === "/logo-icon.png"
  ) {
    return NextResponse.next();
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Westbridge — Offline</title>
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; margin: 0; }
    body {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #000;
      color: #fff;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif;
      padding: 2rem;
      text-align: center;
    }
    p.label {
      font-size: 0.75rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #777;
      margin-bottom: 1.25rem;
    }
    h1 {
      font-size: clamp(1.75rem, 4vw, 2.75rem);
      font-weight: 600;
      letter-spacing: -0.03em;
      line-height: 1.1;
      max-width: 18ch;
      margin-inline: auto;
    }
    p.deck {
      margin-top: 1rem;
      color: #b0b0b0;
      font-size: 1rem;
      line-height: 1.5;
      max-width: 36ch;
      margin-inline: auto;
    }
  </style>
</head>
<body>
  <main>
    <p class="label">Westbridge</p>
    <h1>The site is temporarily unavailable.</h1>
    <p class="deck">We’re offline for a short while. Please check back soon.</p>
  </main>
</body>
</html>`;

  return new NextResponse(html, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "retry-after": "3600",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
