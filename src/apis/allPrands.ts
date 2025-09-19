import { TypeOfPrands } from "@/types/allPrands.type"

 export default async function getAllPrands(){

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands" )
  const {data} :{data:TypeOfPrands[]} = await response.json()

  return data

 }
 