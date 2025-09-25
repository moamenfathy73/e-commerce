

import { getUserOrder } from "@/apis/getUserOrders";
import { order, orders, CartItem } from "@/types/order.type";
import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const AllOrders = async () => {
  const data: orders = await getUserOrder();
  

  return (
    <div className="md:w-[80%] mx-auto pt-[400px] md:pt-20 my-10 px-5 md:px-0">
      

      <div className="space-y-8">
        {data.map((order: order, idx: number) => (
          <Card key={idx} className="border-green-200 shadow-lg">
            {/* Card Header */}
            <CardHeader className="flex justify-between items-center border-b border-green-300 pb-3">
              <p className="text-gray-700 font-semibold">
                Payment: <span className="text-green-700">{order.paymentMethodType}</span>
              </p>
              <span className="px-4 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                ✅ Completed
              </span>
            </CardHeader>

            {/* Products Section */}
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-6">
              {order.cartItems.map((item: CartItem, i: number) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition w-full">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={200}
                      height={200}
                      className="rounded-lg border border-gray-200 object-cover w-full h-[200px] transform hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h1 className="text-sm md:text-base mt-3 font-medium text-gray-700 text-center line-clamp-2">
                    {item.product.title}
                  </h1>
                </div>
              ))}
            </CardContent>

            {/* Order Details Footer */}
            <CardContent className="border-t border-green-300 py-4 space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold text-green-700">Total:</span>{" "}
                {order.totalOrderPrice} EGP
              </p>
              <p className="text-gray-500 text-sm">
                Order ID: <span className="font-mono">{order.id}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
