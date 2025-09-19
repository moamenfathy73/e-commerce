import React from 'react'
import  Image  from 'next/image'; 
import error from "./assets/404.jpg"

const ErrorPAge = () => {
  return (
    <div className='w-full md:w[80%] mx-auto px-5 md:p-0 mt-[450px] md:mt-32'>
        
    <Image src={error} alt='error' className='w-full'/>

    </div>
  )
}

export default ErrorPAge