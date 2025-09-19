'use client'
import { cartContext } from '@/Context/CartContext'
import React, { useContext } from 'react'
import Loading from './../../loading';
import { Button } from '@/components/ui/button';
import  Image  from 'next/image';
import { toast } from 'sonner';
import Link from 'next/link';


const  Cart = () => {

  const contex = useContext(cartContext)

  if (!contex) {
    return <div>Loading...</div>;
  }

const {isLoading , products , totalCartPrrise , removeCartItem , updateCart , clearCart} = contex

if(isLoading){
  return <Loading />
}

if(products.length === 0){


  return   <div className='flex justify-center items-center h-screen'>

      <h1 className='text-red-500 text-3xl font-bold '>No data to display </h1>
        
        </div>
}
async function removeItem ( id : string) {
const data = await removeCartItem(id)
   if ( data && data.status === "success") {
      toast.success("removed successfuly",{position : "top-center" , duration : 700} );
    

    }

    else {
      toast.error("There was an error remove the item from the cart.");
    }

}

async function updateCartItem ( id : string , count : number) {
const data = await updateCart(id , count)
   if ( data && data.status === "success") {
      toast.success("update successfuly",{position : "top-center" , duration : 700} );
    

    }

    else {
      toast.error("There was an error update the item from the cart.");
    }

}
   
   
  return (

    <div className=' w-full md:w-[80%] mx-auto mt-[430px] md:mt-24 px-5 md:px-0 bg-slate-100'>

    <div className='p-5 '>
      <h1 className='text-2xl font-bold'> Shop Cart:</h1>
      <p className='my-3 text-green-500 font-mono'>Total Price : {totalCartPrrise} EGP</p>
      <Button onClick={clearCart} className='mb-10'>Clear Cart</Button>
      <Button className='mb-10 ms-5'>
        <Link href={"/payment"}>Go to Payment</Link>
      </Button>

   

    <div className='allProduct'>
 
    {products.map(function( product , idx : number){
      return    <div key={idx} className='flex items-center justify-between py-3 border-b border-green-500'>

      <div className='flex items-center gap-5'>

        <div>  <Image src={product?.product?.imageCover ?? "/placeholder.png"} alt={product.product.title} width={150} height={150} /> </div>

        <div className='my-3'>
          <h1>{product.product.title}</h1>
          <p className='my-3 text-green-600'>Price : {product.price}</p>
          <Button onClick={()=> removeItem(product.product.id)} className='mx-2 cursor-pointer'>Remove</Button>
          
         </div>

      </div>

      <div className=' flex items-center gap-2 me-2'>
          <Button className='cursor-pointer' onClick={()=>updateCartItem(product.product.id ,product.count+1 )}>+</Button>
          <p>{product.count}</p>
         <Button className='cursor-pointer' onClick={()=>updateCartItem(product.product.id ,product.count-1 )}>-</Button>
      </div>

    </div>

      })}


    </div>

 </div>

    </div>
  )
}

export default Cart