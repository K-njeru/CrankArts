
import { Coffee, Eye, UserCheck } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-orange-50 via-white to-orange-50 w-full overflow-hidden" id='studio'>
      <svg
        className="absolute top-0 left-0 right-0 w-full text-orange-100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 640"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,640L48,608C96,576,192,512,288,480C384,448,480,448,576,426.7C672,405,768,363,864,362.7C960,363,1056,405,1152,416C1248,427,1344,405,1392,394.7L1440,384L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center relative z-10 mt-16">
        {/* <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-16 w-full lg:w-1/2">
          <div className="relative w-full h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Tattoo artist at work"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>  */}
        <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-16 w-full lg:w-1/2">
          <div className="relative w-full h-[400px]">
            <video
              src="vid1.mov"
              className="rounded-lg shadow-lg w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="flex flex-col space-y-8 w-full lg:w-1/2">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Us</h2>
          <div className="flex items-start space-x-4">
            <Coffee className="text-orange-500 w-10 h-10 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Relaxed Atmosphere</h3>
              <p className="text-gray-600">
                Our studio is designed for your comfort. From calming music to cozy seating, we create an environment that helps you feel at ease, whether it&#39;s your first or fiftieth tattoo.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Eye className="text-orange-500 w-10 h-10 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Vision Applied</h3>
              <p className="text-gray-600">
                We take your ideas seriously, translating your vision into beautiful art. From initial sketches to the final piece, we ensure every detail aligns with your expectations.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <UserCheck className="text-orange-500 w-10 h-10 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Experienced Artist</h3>
              <p className="text-gray-600">
                With years of experience and a portfolio of diverse styles, our artists have honed their skills to deliver exceptional artwork that stands the test of time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}