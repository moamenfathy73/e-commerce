"use server"

import { getToken } from "@/utilities/token"

export async function getUserCardAction() {


const token = await getToken()

if (!token) {
    throw Error("Login first")

}


const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {

headers : {
    token : token as string
}

})

const data = await res.json()

return data

}