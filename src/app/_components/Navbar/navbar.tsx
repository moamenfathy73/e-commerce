"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "./../../assets/freshcart-logo.svg";
import { signOut, useSession } from "next-auth/react";
import { cartContext } from "@/Context/CartContext";
import { wishlistContext } from '@/Context/WishlistContext';

const Navbar = () => {
  const { data: session, status } = useSession();

  const { numOfCartItem } = useContext(cartContext);
   const { numOfWishlistItems  } = useContext(wishlistContext);

  return (
    <div className="bg-slate-100 py-5 fixed top-0 left-0 w-full z-50  shadow-md">
      <div className="w-full md:w-[80%] mx-auto flex justify-between items-center flex-col md:flex-row text-center ">
        <ul className="flex  items-center flex-col md:flex-row text-center gap-6">
          {status === "authenticated" && (
            <>
              <li>
                <Link href="/">
                  <Image src={logo} alt="logo" width={200} height={200} />
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className=" hover:text-green-500 font-semibold text-md"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/brand"
                  className="hover:text-green-500 font-semibold text-md"
                >
                  Brand
                </Link>
              </li>

              <li>
                <Link
                  href="/cart"
                  className="hover:text-green-500 flex items-center  relative font-semibold text-md"
                >
                  <span>Cart</span>
                  <div className="relative">
                    <i className="fa-solid fa-cart-plus text-xl text-green-500"></i>

                    {numOfCartItem > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {numOfCartItem}
                      </span>
                    )}
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  href="/allorders"
                  className="hover:text-green-500 font-semibold text-md"
                >
                  Orders
                </Link>
              </li>

              <li className="relative">
                <Link
                  href="/wishlist"
                  className="hover:text-green-500 font-semibold text-md"
                >
                  <i className="fa-solid fa-heart text-3xl text-red-600"></i>

                  {numOfWishlistItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {numOfWishlistItems}
                    </span>
                  )}
                </Link>
              </li>
            </>
          )}

          {status === "loading" && (
            <>
              <h1>loading</h1>
            </>
          )}

          {status === "unauthenticated" && (
            <>
              {" "}
              <Image src={logo} alt="logo" width={200} height={200} />{" "}
            </>
          )}
        </ul>

        <div className="flex items-center flex-col md:flex-row text-center gap-2">
          <div>
            <i className="fab mx-2 fa-facebook-f"></i>
            <i className="fab mx-2 fa-youtube"></i>
            <i className="fab mx-2 fa-twitter"></i>
            <i className="fab mx-2 fa-linkedin"></i>
          </div>

          {status === "authenticated" && (
            <>


              <div className="mx-2 font-bold">
                <h1 className="text-green-500">
                  {" "}
                  Hello {session?.user?.name}{" "}
                </h1>
              </div>


              <div>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="hover:text-green-500 cursor-pointer font-semibold text-md"
                >
                  Logout
                </button>
              </div>

           
            </>
          )}

          {status === "unauthenticated" && (
            <>
              <div>
                <Link href="/login" className="hover:text-green-500">
                  Login
                </Link>

                <Link href="/register" className="hover:text-green-500 mx-2">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;






