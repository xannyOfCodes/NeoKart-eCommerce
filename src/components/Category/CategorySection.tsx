import React, { useState } from 'react'
import { categories } from './categoryData'
import CategoryCard from './CategoryCard'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useNavigate } from 'react-router-dom'


const CategorySection: React.FC = () => {
  const navigate = useNavigate()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [showAll, setShowAll] = useState(false)
  console.log(isDesktop);

  const handleNavigate = (path: string) => {
    navigate(`${path}`)
  }
  

  const visibleCategories = showAll ? categories : isDesktop ? categories.slice(0, 20) : categories.slice(0, 6)
  return (
    <div className='mt-5 p-[1rem] md:w-[85%] md:mx-auto'>
      <h2 className='text-sm font-semibold text-zinc-800 uppercase
      md:text-center md:text-lg'>
        <span>Shop by <span className='font-light border-b-1'>categories</span></span>
      </h2>

      <div
      className='flex items-center flex-wrap gap-x-5 gap-y-5 mt-7 p-[0.5rem]
      md:gap-y-5 md:gap-x-0'>
        {
            visibleCategories.map((category) => (
                <CategoryCard onClick={() => handleNavigate(category.slug)}
                key={category.slug}
                name={category.name}
                slug={category.slug}
                icon={category.icon}/>
            ))
        }
      </div>
       <button onClick={() => setShowAll((prev) => !prev)}
        className=' text-red-700 text-base font-light border-b-1 border-red-700 mt-3 mx-auto block'>{showAll ? "Show less" : "View all"}
        </button>
    </div>
  )
}

export default CategorySection
