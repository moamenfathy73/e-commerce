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
import { loginSchema, LoginSchemaType } from "@/schema/login.Schema";
import  Link  from 'next/link';
import { signIn } from "next-auth/react"; 

const Login = () => {
  const router = useRouter();
  
  const form = useForm<LoginSchemaType>({
    defaultValues: {
     
      email: "",
      password: "",
    
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: LoginSchemaType) {



const res = await signIn("credentials", {
  email: values.email,
  password: values.password,
  redirect: false,
  callbackUrl: "/"
})

console.log(res);


if ( res?.ok){
 toast.success("login success", { position: "top-center" });
 window.location.href = res?.url || "/";
 console.log(res);
 
}



else{
  toast.error(res?.error, { position: "top-center" });
 
  
}





    // try {
    //   const { data } = await axios.post(
    //     "https://ecommerce.routemisr.com/api/v1/auth/signin",
    //     values
    //   );
    //   console.log(data);
    //   toast.success(data.message, { position: "top-center" });
    //   router.push("/");
    // } catch (error) {
    //   toast.error(error.response.data.message, { position: "top-center" });
    // }
  }

  return (
    <div className="mx-auto px-5 md:px-0 w-full  md:w-1/2 mt-[200px] md:mt-32">
      <h1 className="text-3xl text-center mb-5 font-bold">LOGIN FORM</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
   

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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Password </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

    
<Link className=" text-red-500 font-bold" href="/forgetPassword" > Forger Password ??? </Link>
    

          <Button className="w-full mt-5"> LOGIN Now</Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
