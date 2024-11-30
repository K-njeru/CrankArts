'use client'

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ImageData = {
  url: string;
  category: string;
  width: number;
  height: number;
};

const images: ImageData[] = [
  { url: '/img/graph3.webp', category: 'wall art', width: 400, height: 300 },
  { url: '/img/graph2.jpg', category: 'wall art', width: 400, height: 300 },
  { url: '/img/graph1.webp', category: 'wall art', width: 400, height: 300 },
  { url: '/img/tat.png', category: 'tattoos', width: 400, height: 300 },
  { url: '/img/tat-5.png', category: 'tattoos', width: 400, height: 300 },
  { url: '/img/tat-6.png', category: 'tattoos', width: 400, height: 300 },
  { url: '/img/tat-7.png', category: 'tattoos', width: 400, height: 300 },
  { url: '/img/tat-8.png', category: 'tattoos', width: 400, height: 300 },
  { url: '/img/wall1.jpg', category: 'custom designs', width: 400, height: 300 },
  { url: '/img/wall2.jpg', category: 'custom designs', width: 400, height: 300 },
  { url: '/img/pier.jpg', category: 'piercings', width: 400, height: 300 },
  { url: '/img/pier.webp', category: 'piercings', width: 400, height: 300 },
  { url: '/img/piercing-5.png', category: 'piercings', width: 400, height: 300 },
];

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const categories = ['all', 'wall art', 'tattoos', 'custom designs', 'piercings'];

  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter(image => image.category === activeCategory);

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

  return (
    <section className="py-20 bg-gradient-to-r from-orange-50 via-white to-orange-50 w-full overflow-hidden" id='gallery'>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800">Our Masterpieces</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our diverse collection of tattoos, piercings, wall art, and custom designs. Each piece tells a unique story and showcases our commitment to artistic excellence.
        </p>

        {/* Filter Options */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <motion.button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleImageClick(image.url)}
            >
              <Image
                src={image.url}
                alt={image.category}
                width={image.width}
                height={image.height}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors z-10"
                onClick={closeModal}
              >
                <X size={24} />
              </button>
              <button
                className="absolute bottom-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors z-10"
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