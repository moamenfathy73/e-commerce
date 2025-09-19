import * as z from "zod"; 

export const loginSchema = z.object({

    email:z.string().nonempty("email is required").email("invaild email address"),
    password:z.string().nonempty("password is required").min(6, {message: "password must be at least 6 characters"}),
   
})
  



 export type LoginSchemaType = z.infer<typeof loginSchema>