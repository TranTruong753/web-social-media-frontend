import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
// 1. Specify protected and public routes
const protectedRoutes = ['/', '/home']
const publicRoutes = ['/sign-in', '/sign-up']

export async function verifyJWT(token: string|undefined, secret: string|undefined) {
  if(!token) return null
  try {
    const secretKey = new TextEncoder().encode(secret)
    const { payload } = await jwtVerify(token, secretKey)
    return payload
  } catch (err) {
    return null
  }
}

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // 3. Decrypt the session from the cookie
  const token = req.cookies.get("access_token")?.value

  const user = await verifyJWT(token, process.env.NEXT_PUBLIC_JWT_SECRET)

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
  }

  if (isPublicRoute && user) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
