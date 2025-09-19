"use server"

import { getToken } from "@/utilities/token"
import axios from "axios"

export async function updateCartAction(id : string , count : number) {

    const token = await getToken()  

    if (!token) {
        throw   Error("login first")
        }

        const value = {count : count}

        const {data} = await axios .put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, value , {

            headers : {token : token as string }
    
})

         return data

}