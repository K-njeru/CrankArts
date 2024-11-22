import Image from "next/image";
import Navbar from "./sections/navbar";
import Hero from "./sections/hero";
import Services from "./sections/services";
import WhyChooseUs from "./sections/WhyChooseUs";
import BookAppointment from "./sections/BookAppointment";
import Gallery from "./sections/gallery";
import Footer from "./sections/footer";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
     <Navbar />
     <main className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
    <Hero />
    <Services />
    <WhyChooseUs />
    <Gallery />
    <BookAppointment />
    <Footer />
    </main>
    </div>
  );
}
