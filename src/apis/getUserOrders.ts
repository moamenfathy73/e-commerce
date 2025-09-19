 
 "use server"

import { getToken } from "@/utilities/token"
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

 
 export  async function getUserOrder(){


  const token = await getToken()


 const {id}:{id:string} = jwtDecode(token as string)
  

if (!token){

    throw new Error ("Login First")
}
  

const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)

return data

 }