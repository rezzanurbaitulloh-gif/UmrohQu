import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Multi-tenant subdomain detection
  const hostname = request.headers.get('host') || ''
  const isMainDomain = hostname === 'umrohqu.com' || hostname === 'www.umrohqu.com' || hostname === 'localhost:3000'
  
  if (!isMainDomain) {
    // Extract subdomain
    const subdomain = hostname.replace('.umrohqu.com', '').split(':')[0]
    
    // Route to tenant page
    const url = request.nextUrl.clone()
    url.pathname = `/tenant/${subdomain}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|logos|.*\\..*|api).*)',
  ],
}
