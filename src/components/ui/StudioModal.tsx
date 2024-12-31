'use client'

import Image from 'next/image'
import { X, MapPin, Mail, Phone as Call } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface StudioModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function StudioModal({ isOpen, onClose }: StudioModalProps) {

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
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
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
                                <h3 className="text-lg leading-6 font-medium text-orange-500" id="modal-title">
                                    Crank Arts Studio
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 text-center">
                                        Our state-of-the-art studio is equipped with the latest technology and maintains the highest standards of hygiene and safety.
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center justify-between space-x-4">
                                    <a
                                        href="tel:+254706366408"
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <Call className="h-8 w-8" />
                                    </a>

                                    <a
                                        className="relative flex items-center justify-center text-gray-600 hover:text-orange-500"
                                        href="https://www.google.com/maps/search/?api=1&query=Crank+Arts+Studio+Juja+Kenya"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="absolute inset-0 animate-ping rounded-full border-2 border-orange-500"></div>
                                        <MapPin className="h-10 w-10 text-orange-500" />
                                    </a>

                                    <a href="mailto:info@crankarts.com" className="flex items-center justify-center text-blue-600 hover:text-blue-700"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Mail className="h-8 w-8" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
