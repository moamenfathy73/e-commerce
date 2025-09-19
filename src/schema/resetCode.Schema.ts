import * as z from "zod"; 

export const resetCodeSchema = z.object({

    resetCode:z.string().nonempty("Reset Code is required" , ).length(6,"Reset Code must be 6 characters"),     
  
})
  



 export type ResetCodeSchemaType = z.infer<typeof resetCodeSchema>