"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetCodeSchema, ResetCodeSchemaType } from '../../../schema/resetCode.Schema';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"




const ResetCode = () => {
  const router = useRouter();
  
  const form = useForm<ResetCodeSchemaType>({
    defaultValues: {
     
      resetCode: "",
    
    },
    resolver: zodResolver(resetCodeSchema),
  });

  async function handleResetCode(values: ResetCodeSchemaType) {
  try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );

      console.log(data);

      toast.success(data.message, { position: "top-center" });
      router.push("/resetPassword");
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    console.log(error);
    }
  }
  

  return (
    <div className="mx-auto px-5 md:px-0 w-full m md:w-1/2 mt-[200px] md:mt-36">
      <h1 className="text-3xl text-center mb-5 font-bold">RESET CODE FORM</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResetCode)}>
   

          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Email </FormLabel>
                <FormControl>
                      <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                    </InputOTP>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />



            
 
    

          <Button className="w-full mt-5"> Verify Code </Button>
        </form>
      </Form>
    </div>
  );
};


export default ResetCode;
