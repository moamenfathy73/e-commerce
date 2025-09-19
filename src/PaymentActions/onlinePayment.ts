
"use server"
import { getToken } from "@/utilities/token";
import axios from "axios";

export async function onlinePaymentAction(id:string , values : object) {

    const token = await getToken()

    if (! token) {
        throw new Error("Login first");
    }
    
    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, values , {
        headers : {
         token : token as string
        }
    })  
    
    
    return data;
}