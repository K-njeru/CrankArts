
'use client'

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import useEmblaCarousel from 'embla-carousel-react'

type ImageData = {
  url: string;
  category: string;
  subCategory: string;
  width: number;
  height: number;
};

const images: ImageData[] = [
  { url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&q=80', category: 'wall art', subCategory: 'abstract', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=800&q=80', category: 'tattoos', subCategory: 'traditional', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1542727365-19732a80dcfd?w=800&q=80', category: 'tattoos', subCategory: 'modern', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1610890690846-5149750c8634?w=800&q=80', category: 'tattoos', subCategory: 'minimalist', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&q=80', category: 'canvas designs', subCategory: 'landscape', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80', category: 'canvas designs', subCategory: 'portrait', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?w=800&q=80', category: 'piercings', subCategory: 'ear', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1600442715817-4d9c8b6c729f?w=800&q=80', category: 'piercings', subCategory: 'lip', width: 800, height: 600 },
  { url: '/img/graph3.webp', category: 'wall art', subCategory: 'abstract', width: 800, height: 600 },
  { url: '/img/graph2.jpg', category: 'wall art', subCategory: 'modern', width: 800, height: 600 },
  { url: '/img/graph1.webp', category: 'wall art', subCategory: 'abstract', width: 800, height: 600 },
  { url: '/img/tat.png', category: 'tattoos', subCategory: 'modern', width: 800, height: 600 },
  { url: '/img/tat-5.png', category: 'tattoos', subCategory: 'modern', width: 800, height: 600 },
  { url: '/img/tat-6.png', category: 'tattoos', subCategory: 'traditional', width: 800, height: 600 },
  { url: '/img/tat-7.png', category: 'tattoos', subCategory: 'minimalist', width: 800, height: 600 },
  { url: '/img/tat-8.png', category: 'tattoos', subCategory: 'minimalist', width: 800, height: 600 },
  { url: '/img/wall1.jpg', category: 'canvas designs', subCategory: 'portrait', width: 800, height: 600 },
  { url: '/img/wall2.jpg', category: 'canvas designs', subCategory: 'portrait', width: 800, height: 600 },
  { url: '/img/pier.jpg', category: 'piercings', subCategory: 'ear', width: 800, height: 600 },
  { url: '/img/pier.webp', category: 'piercings', subCategory: 'nose', width: 800, height: 600 },
  { url: '/img/piercing-5.png', category: 'piercings', subCategory: 'lip', width: 800, height: 600 },
];

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  const categories = ['all', 'wall art', 'tattoos', 'canvas designs', 'piercings'];

  const subCategories: { [key: string]: string[] } = {
    'all': ['all'],
    'wall art': ['all', 'abstract', 'modern'],
    'tattoos': ['all', 'traditional', 'modern', 'minimalist'],
    'canvas designs': ['all', 'landscape', 'portrait'],
    'piercings': ['all', 'ear', 'nose', 'lip'],
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
    if (emblaApi) {
      const animateCarousel = () => {
        emblaApi.scrollTo(0);
        setTimeout(() => {
          emblaApi.scrollTo(1);
          setTimeout(() => {
            emblaApi.scrollTo(0);
          }, 300);
        }, 300);
      };

      const interval = setInterval(animateCarousel, 3000);

      return () => clearInterval(interval);
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
              className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === category
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
                className={`px-6 py-2 rounded-full font-medium transition-all ${activeSubCategory === subCategory
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
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            ref={emblaRef}
          >
            <CarouselContent>
              {filteredImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Thumbnails Below the Carousel 
      <div className="mt-8 flex flex-wrap justify-center gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="w-24 h-24 cursor-pointer overflow-hidden border rounded-lg"
              onClick={() => handleImageClick(image.url)}
            >
              <Image
                src={image.url}
                alt={`${image.category} - ${image.subCategory}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
              />
            </div>
          ))}
        </div>
      </div>
      */}

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

