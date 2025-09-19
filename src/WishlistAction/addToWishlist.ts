"use server"

import { getToken } from "@/utilities/token";
import axios from "axios";



export async function AddToWishlist(id: string) {

const token = await getToken()


if (!token) {
    throw new  Error("login first")
    }

const values = {productId : id }

const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist" ,values , {

    headers : {token : token as string }
} )


return data

}