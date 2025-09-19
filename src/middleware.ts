
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
const token = await getToken({ req: request });


const { pathname } = request.nextUrl

const authPage = ["/login", "/register"]

const routes = ["/brand", "/categories" , "/cart" , "/productDetails" , "/" ,"/Payment" ,"/allorders", "/wishlist" , "/subCategory"]



if (! token && routes.includes(pathname)){

return NextResponse.redirect(new URL('/login', request.url))
}


if(token && authPage.includes(pathname)){
    return NextResponse.redirect(new URL('/', request.url))

}








  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/register',"/brand", "/categories" , "/cart" , "/productDetails" , "/Payment" , "/allorders","/wishlist" , "/subCategory"],
}