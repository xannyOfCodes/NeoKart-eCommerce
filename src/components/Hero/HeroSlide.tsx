import React from 'react'
import { type HeroSlidesTypes } from "./heroSlides"
import { Link } from 'react-router-dom';

type Props = {
    slide: HeroSlidesTypes;
};

const HeroSlide: React.FC<Props> = ({slide}) => {
    const imageUrl = slide.img;
  return (
    <div style={{ backgroundImage: `url(${imageUrl})`}}
    className='w-[20%] h-[30vh] bg-center bg-no-repeat bg-cover object-cover rounded-xl md:!bg-none
    md:flex md:items-center'>

       <img src={slide.img} 
       alt={slide.heading} 
       className='hidden md:inline-block w-[50%] h-[20vh] rounded-lg'/>
        <div className='w-full h-full text-zinc-100 bg-zinc-900/40 flex items-center rounded-xl 
        md:w-auto md:h-auto md:bg-transparent md:text-zinc-900'>
            <div className='p-[1rem]'>
                <h1 className='text-base font-semibold'>{slide.heading}</h1>
                <p className='text-base font-light mt-2'>{slide.subheading}</p>
                <Link to={slide.ctaLink}
                className='mt-5 inline-block bg-red-700 text-sm px-3 py-1 font-semibold'>
                {slide.ctaText}
                </Link>
            </div>
        </div>
    </div>
  )
}

export default HeroSlide
