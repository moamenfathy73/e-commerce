import { Subcategory } from "@/types/product.type";

export default async function getSubCategories(categoryId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);


  const { data }: { data: Subcategory[] } = await res.json();
  return data; 
}
