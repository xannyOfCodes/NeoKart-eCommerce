import React from 'react'
import type { CategoryItem } from './categoryData'
import { Link } from 'react-router-dom';


type props = CategoryItem;

const CategoryCard: React.FC<props> = ({ name, slug, icon}) => {
  return (
    <div className='w-[29%] flex flex-col items-center md:w-[10%]'>
          <img src={icon} alt={slug} 
          className='w-[1.7rem]'/>
          <p className='text-zinc-800 text-sm cursor-pointer'><Link to={slug}>{name}</Link></p>
    </div>
  )
}

export default CategoryCard
