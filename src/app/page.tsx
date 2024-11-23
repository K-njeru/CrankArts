'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "./sections/navbar";
import Hero from "./sections/hero";
import Services from "./sections/services";
import WhyChooseUs from "./sections/WhyChooseUs";
import BookAppointment from "./sections/BookAppointment";
import Gallery from "./sections/gallery";
import Footer from "./sections/footer";

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
        setShowChat(true);
      } else {
        setShowButton(false);
        setShowChat(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showChat) {
      window.chtlConfig = { chatbotId: "5542779218" };
      const script = document.createElement('script');
      script.src = "https://chatling.ai/js/embed.js";
      script.async = true;
      script.setAttribute('data-id', "5542779218");
      script.setAttribute('id', "chatling-embed-script");
      script.setAttribute('type', "text/javascript");
      document.body.appendChild(script);
    } else {
      const script = document.getElementById("chatling-embed-script");
      if (script) {
        document.body.removeChild(script);
      }
      // Remove the chat widget if it exists
      const chatWidget = document.querySelector('.chatling-widget');
      if (chatWidget) {
        chatWidget.remove();
      }
    }
  }, [showChat]);

  const scrollToTop = () => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="home" className="font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <Hero />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <BookAppointment />
        <Footer />
      </main>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-20 right-5 bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 z-50"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}