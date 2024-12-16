'use client';

import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-b from-orange-100 to-orange-200 text-gray-800 pt-20 pb-6 w-full overflow-hidden">
      {/* Curvy Divider on Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff7ed"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-start">
          {/* Crank Arts Marketing Section */}
          <div className="w-full md:w-1/2 lg:w-1/3 mb-10">
            <h3 className="text-2xl font-bold mb-6 text-orange-600">Welcome to Crank Arts</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At Crank Arts, we bring your creativity to life with precision and passion. From stunning tattoos and piercings to custom wall art and paintings, we specialize in creating unique designs that reflect your individuality.
            </p>
            <Link
              href="#services"
              className="inline-block bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition-colors duration-300"
            >
              Explore Our Services
            </Link>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/2 lg:w-1/4 mb-10">
            <h3 className="text-2xl font-bold mb-6 text-orange-600">Quick Links</h3>
            <ul className="space-y-3">
              {['Services', 'Studio', 'Gallery', 'Appointment'].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-orange-500 transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Section */}
          <div className="w-full md:w-1/2 lg:w-1/3 mb-10">
            <h3 className="text-2xl font-bold mb-6 text-orange-600">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Crank+Arts+Studio+Juja+Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline hover:text-orange-500 transition-colors duration-300"
                >
                  <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                  <span>Gate C Street, Crank Arts Studio, Juja</span>
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="tel:+254706366408"
                  className="flex items-center hover:underline hover:text-orange-500 transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 mr-3 text-orange-500" />
                  <span>(254) 706366408</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  href="mailto:info@crankarts.com"
                  className="flex items-center hover:underline hover:text-orange-500 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 mr-3 text-orange-500" />
                  <span>info@crankarts.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-orange-300 pt-8 mt-8">
          <div className="flex justify-center space-x-6">
            {[
              {
                icon: () => (
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"></path>
                  </svg>
                ),
                href: 'https:tiktok.com/@crank_arts?_t=8sDe41CS0gQ&_r=1', target:'blank'
              },
              { icon: Instagram, href: 'https://www.instagram.com/crank_arts/profilecard/?igsh=MXNtdWVpYjFxanFtOQ==', target:'blank' } ,
              {
                icon: () => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    fill="currentColor"
                  >
                    <path d="M7.55 7.05l4.1 4.94-4.1 5.02h2.57l2.6-3.22 2.56 3.22h2.67L14 12l4.2-4.95h-2.5l-2.45 2.96-2.5-2.96H7.55z"></path>
                  </svg>
                ),
                href: 'https://x.com' , target:'blank'
              },
              { icon: Facebook, href: 'https://facebook.com' , target:'blank'},

            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-900 transition-colors duration-300"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-orange-500 hover:bg-orange-300 hover:border-orange-600 transition-colors duration-300">
                  <Icon />
                </div>
              </a>
            ))}
          </div>
        </div>


        {/* Bottom Text */}
        <div className="text-center text-sm mt-8">
          © {new Date().getFullYear()} Crank Arts. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;