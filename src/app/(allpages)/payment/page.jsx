
"use client";

import React, { useContext, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { cartContext } from '@/Context/CartContext';
import { cashPaymentAction } from '@/PaymentActions/cashPayment';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

import { onlinePaymentAction } from '@/PaymentActions/onlinePayment'







const Payment = () => {

 const router =  useRouter()

 const {cartId , afterPayment}  = useContext(cartContext)


const details = useRef("");
const phone = useRef("");
const city = useRef("");  



async function cashPayment() {

  const values = {
    shippingAddress:{
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value,
        }
  }


  try {

    const data = await cashPaymentAction(cartId , values);

    console.log(data);

    toast.success(data.status ,{ position : "top-center" , duration : 1000 } )

    afterPayment()

    router.push("/allorders")
    
  } catch (error) {
    console.log(error);
  }
  

   
  // console.log(values);
}





async function onlinePayment() {

  const values = {
    shippingAddress:{
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value,
        }
  }


  try {

    const data = await onlinePaymentAction(cartId , values);

    console.log(data);


    if (data.status === "success" ){
      window.location.href = data.session.url
    }

    toast.success(data.status ,{ position : "top-center" , duration : 1000 } )

    router.push("/allorders")
    
  } catch (error) {
    console.log(error);
  }
  

   
  // console.log(values);
}
  return (
    <div className="w-full mt-[450px] md:mt-28 md:w-1/2 my-10 mx-auto px-5 md:px-0  ">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-green-900 drop-shadow-lg"> 💳 Payment</h1>

      <div>
        <label htmlFor="details" className="mb-1 font-medium text-gray-700">Details</label>
             <Input ref={details} id="details" type="text" placeholder="Enter address details" />

         <label htmlFor="phone" className="mb-1 font-medium text-gray-700">Phone</label>
           <Input ref={phone} id="phone" type="tel" placeholder="Enter phone number" />

           <label htmlFor="city" className="mb-1 font-medium text-gray-700">City</label>
             <Input ref={city} id="city" type="text" placeholder="Enter city" />

        <Button onClick={cashPayment} className="w-full cursor-pointer my-2 bg-green-600 hover:bg-green-700 text-white font-bold">
             Cash Payment
           </Button>
        <Button onClick={onlinePayment} className="w-full cursor-pointer bg-teal-500 hover:bg-teal-700  text-white font-bold">
            Online Payment
          </Button>

      </div>
    </div>
  );
};

export default Payment;



