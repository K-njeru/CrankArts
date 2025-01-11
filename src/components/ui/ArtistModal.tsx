'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Phone as Call } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ArtistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ArtistModal({ isOpen, onClose }: ArtistModalProps) {
  const [whatsappUrl] = useState('https://wa.me/254706366408')

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        >
          {/* Background Blur */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm z-30" aria-hidden="true"></div>

          {/* Modal Content */}
          <div className="flex flex-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-40 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-transparent rounded-md text-orange-400 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/img/crank.png"
                  alt="Crank Arts Studio"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
              </div>
              <h3 className="text-lg leading-6 font-medium text-orange-500 text-center" id="modal-title">Morris</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Passionate tattoo artist with over 10 years of experience.
                  Specializing in custom designs and bringing your vision
                  to life.
                </p>
              </div>
              <div className="mt-4 flex flex-col items-center space-y-2">
                <div className="mt-4 flex items-center justify-center space-x-6">
                  <a
                    href="tel:+254706366408"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Call className="h-8 w-8" />
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full"
                  >
                    <span className="sr-only">WhatsApp</span>
                    <svg
                      className="h-8 w-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@crank_arts?_t=ZM-8swtjC8cRrq&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-700"
                  >
                    <span className="sr-only">TikTok</span>
                    <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"></path>
                  </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )
      }
    </AnimatePresence >
  )
}
