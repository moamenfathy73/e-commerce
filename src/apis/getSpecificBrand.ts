
import { SubBrand } from "@/types/SpecificBrand.type"


export default async function getSpecificBrand (id: string){

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    const { data } :{ data: SubBrand } = await response.json()
console.log(data);

    return data

}