'use client'

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card"
import useEmblaCarousel from 'embla-carousel-react'
import AutoplayPlugin from 'embla-carousel-autoplay'

type ImageData = {
  url: string;
  category: string;
  subCategory: string;
  width: number;
  height: number;
};

const images: ImageData[] = [
  { url: '/img/arm-tat1.jpg', category: 'tattoos', subCategory: 'arm', width: 800, height: 600 },
  { url: '/img/arm-tat2.jpg', category: 'tattoos', subCategory: 'arm', width: 800, height: 600 },
  { url: '/img/arm-tat3.jpg', category: 'tattoos', subCategory: 'arm', width: 800, height: 600 },
  { url: '/img/arm-tat4.jpg', category: 'tattoos', subCategory: 'arm', width: 800, height: 600 },
  { url: '/img/arm-tat5.jpg', category: 'tattoos', subCategory: 'arm', width: 800, height: 600 },
  { url: '/img/arm-tat6.jpg', category: 'tattoos', subCategory: 'arm', width: 800, height: 600 },
  { url: '/img/arm-tat7.jpg', category: 'tattoos', subCategory: 'arm', width: 800, height: 600 },
  { url: '/img/arm-tat8.jpg', category: 'tattoos', subCategory: 'arm', width: 800, height: 600 },
  { url: '/img/arm-tat9.jpg', category: 'tattoos', subCategory: 'arm', width: 800, height: 600 },
  { url: '/img/arm-tat10.jpg', category: 'tattoos', subCategory: 'arm', width: 800, height: 600 },
  { url: '/img/chest-tat1.jpg', category: 'tattoos', subCategory: 'chest', width: 800, height: 600 },
  { url: '/img/chest-tat2.jpg', category: 'tattoos', subCategory: 'chest', width: 800, height: 600 },
  { url: '/img/chest-tat3.jpg', category: 'tattoos', subCategory: 'chest', width: 800, height: 600 },
  { url: '/img/leg-tat1.jpg', category: 'tattoos', subCategory: 'thigh & calf', width: 800, height: 600 },
  { url: '/img/back-tat1.jpg', category: 'tattoos', subCategory: 'back', width: 800, height: 600 },
  { url: '/img/others-tat1.jpg', category: 'tattoos', subCategory: 'others', width: 800, height: 600 },
  { url: '/img/landscape1.jpg', category: 'canvas designs', subCategory: 'landscape', width: 800, height: 600 },
  { url: '/img/landscape2.jpg', category: 'canvas designs', subCategory: 'landscape', width: 800, height: 600 },
  { url: '/img/potrait1.jpg', category: 'canvas designs', subCategory: 'portrait', width: 800, height: 600 },
  { url: '/img/potrait2.jpg', category: 'canvas designs', subCategory: 'portrait', width: 800, height: 600 },
  { url: '/img/potrait3.jpg', category: 'canvas designs', subCategory: 'portrait', width: 800, height: 600 },
  { url: '/img/graphiti1.jpg', category: 'wall art', subCategory: 'Graffiti', width: 800, height: 600 },
  { url: '/img/graphiti2.jpg', category: 'wall art', subCategory: 'Graffiti', width: 800, height: 600 },
  { url: '/img/graphiti3.jpg', category: 'wall art', subCategory: 'Graffiti', width: 800, height: 600 },
  { url: '/img/nose.jpeg', category: 'piercings', subCategory: 'nose', width: 800, height: 600 },
  { url: '/img/lips.jpeg', category: 'piercings', subCategory: 'lip', width: 800, height: 600 },
];

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [AutoplayPlugin({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true, stopOnLastSnap: false })]
  )
  const [thumbsRef, thumbsApi] = useEmblaCarousel({ containScroll: 'keepSnaps', dragFree: true })

  const categories = ['all', 'wall art', 'tattoos', 'canvas designs', 'piercings'];

  const subCategories: { [key: string]: string[] } = {
    'all': ['all'],
    'wall art': ['all', 'Graffiti', 'Functional'],
    'tattoos': ['all', 'arm', 'thigh & calf', 'back', 'chest' , 'others'],
    'canvas designs': ['all', 'landscape', 'portrait'],
    'piercings': ['all', 'ear', 'nose', 'lip', 'others'],
  };

  const filteredImages = images.filter(image =>
    (activeCategory === 'all' || image.category === activeCategory) &&
    (activeSubCategory === 'all' || image.subCategory === activeSubCategory)
  );

  const handleImageClick = useCallback((url: string) => {
    setSelectedImage(url);
    setIsZoomed(false);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setIsZoomed(false);
  }, []);

  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev);
  }, []);

  useEffect(() => {
    if (emblaApi && thumbsApi) {
      emblaApi.on('select', () => {
        const index = emblaApi.selectedScrollSnap();
        thumbsApi.scrollTo(index);
      });
    }
  }, [emblaApi, thumbsApi]);

  const scrollToIndex = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);
  

  return (
    <section className="py-20 bg-gradient-to-r from-orange-50 via-white to-orange-50 w-full overflow-hidden" id='gallery'>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800">Our Masterpieces</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our diverse collection of tattoos, piercings, wall art, and canvas designs. Each piece tells a unique story and showcases our commitment to artistic excellence.
        </p>

        {/* Main Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {categories.map(category => (
            <motion.button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => {
                setActiveCategory(category);
                setActiveSubCategory('all');
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Sub Categories */}
        {activeCategory !== 'all' && subCategories[activeCategory] && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {subCategories[activeCategory].map(subCategory => (
              <motion.button
                key={subCategory}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeSubCategory === subCategory
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActiveSubCategory(subCategory)}
              >
                {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
              </motion.button>
            ))}
          </div>
        )}

        {/* Carousel */}
        <div className="relative w-full max-w-5xl mx-auto">
          {filteredImages.length > 0 ? (
            <>
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {filteredImages.map((image, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]">
                      <div className="p-1">
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <Image
                              src={image.url}
                              alt={`${image.category} - ${image.subCategory}`}
                              width={image.width}
                              height={image.height}
                              className="w-full h-64 object-cover cursor-pointer transition-transform duration-300 hover:scale-110"
                              onClick={() => handleImageClick(image.url)}
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-200 rounded-full p-2 z-10"
                onClick={() => emblaApi?.scrollPrev()}
              >
                <ChevronLeft className="text-orange-300 hover:text-orange-500 transition-colors duration-300" />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-200 rounded-full p-2 z-10"
                onClick={() => emblaApi?.scrollNext()}
              >
                <ChevronRight className="text-orange-300 hover:text-orange-500 transition-colors duration-300" />
              </button>
            </>
          ) : (
            <div className="text-center text-gray-500 py-20">No images available for the selected category.</div>
          )}
        </div>

        {/* Thumbnails - visible only on small screens */}
        {filteredImages.length > 0 && (
          <div className="mt-4 max-w-5xl mx-auto md:hidden">
            <div className="overflow-hidden" ref={thumbsRef}>
              <div className="flex">
                {filteredImages.map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-20 h-20 mr-2 cursor-pointer"
                    onClick={() => scrollToIndex(index)}
                  >
                    <Image
                      src={image.url}
                      alt={`${image.category} - ${image.subCategory} thumbnail`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded-md"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Image Viewing */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div className="relative max-w-4xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors z-10"
                onClick={closeModal}
              >
                <X size={24} />
              </button>
              <button
                className="absolute bottom-4 right-4 text-white p-2 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors z-10"
                onClick={toggleZoom}
              >
                {isZoomed ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
              </button>
              <motion.div
                className="relative w-full h-full flex items-center justify-center overflow-hidden"
                initial={{ scale: 1 }}
                animate={{ scale: isZoomed ? 2 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={selectedImage}
                  alt="Selected artwork"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                  className={`max-w-full max-h-full ${isZoomed ? 'cursor-move' : 'cursor-zoom-in'}`}
                  onClick={toggleZoom}
                  draggable={false}
                  loading='lazy'
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

