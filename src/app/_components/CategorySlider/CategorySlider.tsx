import getAllCategories from '@/apis/allCategories'
import React from 'react'
import SwiperCategory from '../SwiperCategory/SwiperCategory'
import { category } from '@/types/category.type'


const CategorySlider =async () => {
  const data:category[] =await  getAllCategories()
  return (
    <div className='mb-3 '>
        
        
        
        <SwiperCategory    categories={data} />
        
        
        
        </div>
  )
}

export default CategorySlider