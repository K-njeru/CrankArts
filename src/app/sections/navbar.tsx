'use client'

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Anchor, Zap, Users, Building2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import StudioModal from "@/components/ui/StudioModal"
import ArtistModal from "@/components/ui/ArtistModal"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("home")
  const [artistModalOpen, setArtistModalOpen] = useState(false)
  const [studioModalOpen, setStudioModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (dropdownOpen && !(e.target as Element).closest('.services-dropdown')) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', closeDropdown)
    return () => document.removeEventListener('click', closeDropdown)
  }, [dropdownOpen])

  useEffect(() => {
    const sections = document.querySelectorAll("section")
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Studio", href: "#studio" },
    { name: "Gallery", href: "#gallery" },
    { name: "Appointment", href: "#appointment" },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-gray-900' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Crank Arts</span>
            <Image className="h-8 w-auto" src="/img/logo.png" alt="" width={32} height={32} />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {item.name === "Services" ? (
                <div className="relative group services-dropdown">
                  <button
                    type="button"
                    className={`flex items-center gap-x-1 text-sm font-semibold leading-6 ${activeSection === 'services' ? 'text-orange-500' : 'text-gray-300 hover:text-white'
                      }`}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Services
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>

                  {(dropdownOpen || (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches && dropdownOpen)) && (
                    <div
                      className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <div className="p-4 space-y-4">
                        <ServiceItem icon={<Anchor className="text-orange-500" />} title="Tattooing" description="Professional tattoo application to express yourself." />
                        <ServiceItem icon={<Zap className="text-orange-500" />} title="Piercing" description="High-quality piercing for all styles and tastes." />
                        <ServiceItem icon={<Users className="text-orange-500" />} title="Canvas Designs" description="Unique, personalized artwork tailored to your vision." />
                        <ServiceItem icon={<Building2 className="text-orange-500" />} title="Wall Art" description="Transform your walls with personalized art." />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`text-sm font-semibold leading-6 relative ${activeSection === item.href.substring(1) ? 'text-orange-500' : 'text-gray-300 hover:text-orange-500'
                    } group`}
                >
                  {item.name}
                  <span className="absolute left-0 top-5 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/*<div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="https://wa.me/254794298696"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold leading-6 text-orange-300 hover:text-orange-500"
          >
            Artist <span aria-hidden="true" className="ml-2">&rarr;</span>
          </a>
        </div>
        */}

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={() => setStudioModalOpen(true)}
            className="text-sm font-semibold leading-6 text-orange-300 hover:text-orange-500 ml-4"
          >
            Studio <span aria-hidden="true" className="ml-2">&rarr;</span>
          </button>
        </div>

      </nav>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-full bg-gray-900 p-6 sm:max-w-sm"
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Crank Arts</span>
                <Image className="h-8 w-auto" src="/img/logo.png" alt="" width={32} height={32} />
              </Link>
              <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-700">
                <div className="space-y-2 py-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${activeSection === item.href.substring(1) ? 'text-orange-500' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 flex flex-col">
                  <button
                    onClick={() => {
                      setArtistModalOpen(true);
                      setMenuOpen(false);
                    }}
                    className="text-sm font-semibold leading-6 text-orange-300 hover:text-orange-500 text-left h-[30px] mt-3"
                  >
                    Artist <span aria-hidden="true" className="ml-2">&rarr;</span>
                  </button>
                  <button
                    onClick={() => {
                      setStudioModalOpen(true);
                      setMenuOpen(false);
                    }}
                    className="text-sm font-semibold leading-6 text-orange-300 hover:text-orange-500 text-left h-[30px] mt-3"
                  >
                    Studio <span aria-hidden="true" className="ml-2">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <ArtistModal isOpen={artistModalOpen} onClose={() => setArtistModalOpen(false)} />
      <StudioModal isOpen={studioModalOpen} onClose={() => setStudioModalOpen(false)} />
    </header>
  )
}

interface ServiceItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ServiceItem({ icon, title, description }: ServiceItemProps) {
  return (
    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
        {icon}
      </div>
      <div className="flex-auto">
        <a href="#services" className="block font-semibold text-gray-900">
          {title}
          <span className="absolute inset-0"></span>
        </a>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  )
}