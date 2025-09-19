import * as z from "zod"; 

export const forgetPasswordSchema = z.object({

    email:z.string().nonempty("email is required").email("invaild email address"),
  
   
})
  



 export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>