import React from 'react';
import Image from 'next/image';

export default function BookAppointment() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-orange-50 via-white to-orange-50 w-full overflow-hidden" id='appointment'>
      <div className="max-w-7xl mx-auto px-8 flex flex-col-reverse lg:flex-row items-center">
        {/* Form Section */}
        <div className="lg:w-2/5 w-full h-auto bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold text-orange-700 mb-6">Get Inked</h2>
          <form
            action="https://formsubmit.co/knjeru519@gmail.com"
            method="POST"
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-800 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-800 mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-gray-800 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-800 mb-2">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-800 mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition-colors duration-300"
            >
              Book Now
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 lg:ml-12 flex justify-center items-center">
        <Image
            src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            alt="Tattoo Studio"
            width={800}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
