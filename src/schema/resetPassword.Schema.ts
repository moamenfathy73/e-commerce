import * as z from "zod"; 

export const resetPassword = z.object({

    email:z.string().nonempty("email is required").email("invaild email address"),
    newPassword:z.string().nonempty("password is required").min(6, {message: "password must be at least 6 characters"}),
   
})
  



 export type ResetPasswordSchemaType = z.infer<typeof resetPassword>