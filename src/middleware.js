import { NextResponse } from "next/server"

export function middleware(request) {
  const token = request.cookies.get("token")?.value
  const isAuthPage = request.nextUrl.pathname.startsWith("/login")
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard")

  // se tentar acessar dashboard sem token → redireciona para login
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // se já estiver logado e tentar acessar login → redireciona para dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}