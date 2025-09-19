import * as z from "zod"; 

export const registerSchema = z.object({

    name: z.string().nonempty("name is required").min(3, {message: "name must be at least 3 characters"}).max(20, {message: "name must be at most 20 characters"}),
    email:z.string().nonempty("email is required").email("invaild email address"),
    password:z.string().nonempty("password is required").min(6, {message: "password must be at least 6 characters"}),
    rePassword:z.string().nonempty("password is required").min(6, {message: "password must be at least 6 characters"}),
    phone:z.string().nonempty("phone is required").regex(/^(010|011|012|015)[0-9]{8}$/, "invalid phone number"),
}).refine(function(object){

if (object.password === object.rePassword){
{
    return true
}


return false 

}
},


{error : "passwords do not match", path: ["rePassword"]}
)
  



 export type RegisterSchemaType = z.infer<typeof registerSchema>