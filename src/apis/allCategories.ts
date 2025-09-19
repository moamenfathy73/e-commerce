import { allCategories } from "@/types/allCategories.type"

 export default async function getAllCategories(){


  const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories" )
  const {data}:allCategories = await response.json()

  return data

 }
 