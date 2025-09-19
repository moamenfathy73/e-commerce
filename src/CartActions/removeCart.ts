"use server"

import { getToken } from "@/utilities/token"
import axios from "axios"

export async function removeCartItemAction(id : string) {


   const token = await getToken()

   if (!token) {
    throw Error("login first")
    }
    

    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {

        headers : {
            
            token : token as string 
        }
    } )

        

    return data
}