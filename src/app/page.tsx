import getAllProducts from "@/apis/allProducts";
import HomeCArd from "./_components/HomeCard/HomeCArd";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import { Product } from "@/types/product.type";



export default async function  Home() {


  const data = await getAllProducts()
  


  return (
  <>
  <section className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto ">
    <MainSlider/>
    <CategorySlider/>
    <div className="flex flex-wrap ">
   {data.map( (product:Product , idx:number )=> <HomeCArd key={idx} product={product}/>   )}

    </div>
    


  </section>
  </>
  );
}
