import { product } from "@/types/product.type"


export default async function getSingleProduct (id: string){

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    const { data } :{ data: product } = await response.json()

    return data

}