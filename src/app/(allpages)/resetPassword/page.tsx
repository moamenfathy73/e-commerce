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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { resetPassword, ResetPasswordSchemaType } from "@/schema/resetPassword.Schema";

const ResetPassword = () => {

    const [btnLoadind, setBtnLoading] = useState<boolean>(true)
  const router = useRouter();
  
  const form = useForm<ResetPasswordSchemaType>({
    defaultValues: {
     
      email: "",
      newPassword: "",
    
    },
    resolver: zodResolver(resetPassword),
  });

  async function handleResetPassword(values: ResetPasswordSchemaType) {
    setBtnLoading(false )
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
    
      console.log(data);
      toast.success(data.token, { position: "top-center" });
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    console.log(error);
    }
     setBtnLoading(true )
  }

  return (
    <div className="mx-auto px-5 md:px-0 w-full md:w-1/2 mt-[200px] md:mt-36">
      <h1 className="text-3xl text-center mb-5 font-bold">RESET PASSWORD FORM</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResetPassword)}>
   

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

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>  New Password </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

    {btnLoadind ?  <Button className="w-full mt-5"> Reset Password</Button>
    : <Button type="button" className="w-full mt-5"> <i className="fa-solid fa-spin fa-spinner"></i></Button> }

    
         
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
