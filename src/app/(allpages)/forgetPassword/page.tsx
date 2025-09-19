"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { forgetPasswordSchema , ForgetPasswordSchemaType } from '@/schema/forgetPassword.Schema';





const ForgetPassword = () => {
  const router = useRouter();
  
  const form = useForm<ForgetPasswordSchemaType>({
    defaultValues: {
     
      email: "",
    
    },
    resolver: zodResolver(forgetPasswordSchema),
  });

  async function handleForgetPassword(values: ForgetPasswordSchemaType) {
  try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );

      console.log(data);

      toast.success(data.status, { position: "top-center" });
      router.push("/resetCode");
    
    } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message ?? "Something went wrong", {
      position: "top-center",
    });
  } else {
    toast.error("Unexpected error", { position: "top-center" });
  }
  console.log(error);
}

  }
  

  return (
    <div className="mx-auto px-5 md:px-0 w-full  md:w-1/2 mt-[200px] md:mt-36">
      <h1 className="text-3xl text-center mb-5 font-bold">FORGET PASSWORD FORM</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleForgetPassword)}>
   

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Email </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />



            
 
    

          <Button className="w-full mt-5"> Send Email </Button>
        </form>
      </Form>
    </div>
  );
};


export default ForgetPassword;
