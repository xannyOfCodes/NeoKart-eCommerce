import React, { useEffect, useRef, useState } from 'react'
import { heroSlides } from './heroSlides';
import HeroSlide from './HeroSlide';

const Hero: React.FC = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const slideCount = heroSlides.length;

  // === Auto-play logic ===
  useEffect(() => {
    resetAutoPlay();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex])
  const resetAutoPlay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slideCount)
    }, 5000);
  };

  // === Manual Navigation (Desktop)
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  // const prevSlide = () => {
  //   setCurrentIndex((prev) => (prev -1 + slideCount) % slideCount);
  // };
  // const nextSlide = () => {
  //   setCurrentIndex((prev) => ( prev +1 ) % slideCount);
  // };

  return (
     <div className='p-[1rem]'>
      <div className="relative overflow-hidden">
        <div
        className="flex transition-transform duration-700 ease-in-out md:w-[50%]"
        style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${slideCount * 100}%` }}
      >
        {heroSlides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 ">
            <HeroSlide slide={slide} />
          </div>
        ))}
      </div>

      {/* === Arrows (desktop only) === */}
      {/* <div className="hidden md:flex absolute top-1/2 left-4 z-10">
        <button onClick={prevSlide} className="text-white text-3xl">&#8592;</button>
      </div>
      <div className="hidden md:flex absolute top-1/2 right-4 z-10">
        <button onClick={nextSlide} className="text-white text-3xl">&#8594;</button>
      </div> */}
      </div>

      {/* === Dots === */}
      <div className="mt-3 flex items-center justify-center gap-x-1">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${currentIndex === index ? "border-2 border-red-500" : "bg-gray-400/30"}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
