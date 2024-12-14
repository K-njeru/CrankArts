'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

const carouselData = [
  {
    image: '/img/crank.jpg',
    title: 'CRANK ARTS',
    description: 'Bringing your wildest imaginations to life through stunningly detailed tattoo art.',
  },
  {
    image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    title: 'Traditional Tattoos',
    description: 'Timeless tattoo designs that stand the test of time with bold lines and vibrant colors.',
  },
  {
    image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Geometric Tattoos',
    description: 'Explore the beauty of symmetry and clean designs with our unique geometric tattoos.',
  }
]

const CursorTrail = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        className="cursor-trail fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          background: 'radial-gradient(circle, rgba(255,165,0,0.5) 0%, rgba(255,165,0,0) 70%)',
        }}
      />
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="cursor-trail-dot fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            background: 'rgba(255,165,0,0.5)',
            scale: 1 - index * 0.2,
            opacity: 1 - index * 0.2,
          }}
          transition={{
            delay: index * 0.05,
          }}
        />
      ))}
    </>
  )
}

export default function Hero() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentSlide((prev) => (prev + 1) % carouselData.length)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [isHovering])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height
      containerRef.current.style.setProperty('--mouse-x', `${x}`)
      containerRef.current.style.setProperty('--mouse-y', `${y}`)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      setCurrentSlide((prev) => (prev + 1) % carouselData.length)
    }

    if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length)
    }
  }

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length)
  }, [])

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-black" id='hero'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <CursorTrail />
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={carouselData[currentSlide].image}
            alt={carouselData[currentSlide].title}
            layout="fill"
            objectFit="cover"
            quality={75}
            priority={currentSlide === 0}
            loading={currentSlide === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div 
          className="text-center px-4 sm:px-6 lg:px-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight text-white">
            <span className="block">{carouselData[currentSlide].title}</span>
            <span className="block text-orange-300">Tattoo Artistry</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl text-gray-200">
            {carouselData[currentSlide].description}
          </p>
          <div className="mt-10">
            <button
              onClick={() => router.push('/book')}
              className="relative bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full overflow-hidden group"
            >
              <span className="relative z-10">Book Your Session</span>
              <div className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
            <div className="flex justify-center mt-4">
              <motion.div
                className="cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                onClick={scrollToServices}
              >
                <ChevronDown size={60} className="text-orange-300 hover:text-orange-500 transition-colors duration-300" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-orange-300 hover:text-orange-500 p-2 rounded-full z-20 hover:bg-opacity-75 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-orange-300 hover:text-orange-500 p-2 rounded-full z-20 hover:bg-opacity-75 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-orange-500 w-6' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div 
        className="absolute inset-0 pointer-events-none filter blur-sm"
        style={{
          background: 'radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 20%)',
        }}
      />
    </div>
  )
}