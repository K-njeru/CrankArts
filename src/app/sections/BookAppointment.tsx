import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import MessageBanner from '@/components/ui/MessageBanner';
import emailjs from '@emailjs/browser';
import { emailConfig } from '@/config/emailjs';
import { compressImage } from '@/utils/imageCompression';

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
    tattoo_image: null as File | null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [bannerMessage, setBannerMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(emailConfig.publicKey);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, tattoo_image: 'Please select an image file.' }));
        setBannerMessage({ text: 'Kindly switch your attached file to an image to successfully submit your request.', type: 'error' });
      } else if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, tattoo_image: 'File size must not exceed 5 MB.' }));
      } else {
        setFormData(prev => ({ ...prev, tattoo_image: file }));
        setErrors(prev => ({ ...prev, tattoo_image: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const currentDate = new Date().toISOString().split('T')[0];

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.date) newErrors.date = 'Date is required';
    else if (formData.date < currentDate) newErrors.date = 'Selected date cannot be in the past';
    if (!formData.time) newErrors.time = 'Time is required';
    if (formData.tattoo_image && !formData.tattoo_image.type.startsWith('image/')) {
      newErrors.tattoo_image = 'Please select an image file.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBannerMessage(null);
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Compress and convert image to base64 if it exists
      let imageBase64 = '';
      if (formData.tattoo_image) {
        imageBase64 = await compressImage(formData.tattoo_image);
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        phone_number: formData.phone,
        preferred_date: formData.date,
        preferred_time: formData.time,
        message: formData.message,
        tattoo_image: imageBase64,
        file_name: formData.tattoo_image?.name || 'No image attached'
      };

      // Send email using EmailJS
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams
      );

      setBannerMessage({ 
        text: 'Thank you for reaching out. Our Artist will review and get back to you!',
        type: 'success' 
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: '',
        tattoo_image: null,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setBannerMessage({ 
        text: 'An error occurred while sending your request. Please try again later.',
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-r from-orange-50 via-white to-orange-50 w-full overflow-hidden" id='appointment'>
      {bannerMessage && (
        <MessageBanner
          message={bannerMessage.text}
          type={bannerMessage.type}
          onClose={() => setBannerMessage(null)}
        />
      )}
      <div className="max-w-7xl mx-auto px-8 flex flex-col-reverse lg:flex-row items-center">
        {/* Form Section */}
        <div className="lg:w-2/5 w-full h-auto bg-white shadow-2xl rounded-lg p-8 transition-all duration-300 hover:shadow-orange-200">
          <h2 className="text-3xl font-bold text-orange-700 mb-6">Get Inked</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-800 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-gray-800 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-800 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                required
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-gray-800 mb-2">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                required
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-gray-800 mb-2">
                Preferred Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                required
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>
            <div>
              <label className="block text-gray-800 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-800 mb-2">Tattoo Design (Optional)</label>
              <div className="relative">
                <input
                  type="file"
                  id="fileInput"
                  name="tattoo_image"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="fileInput"
                  className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg cursor-pointer hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 group"
                >
                  <Upload className="w-6 h-6 mr-2 group-hover:animate-bounce" />
                  <span className="font-medium">Upload Your Design</span>
                  <span className="ml-2 text-xs opacity-70">(Max 5MB)</span>
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">Note: The image will be compressed before sending to ensure successful delivery.</p>
              {errors.tattoo_image && <p className="text-red-500 text-sm mt-1">{errors.tattoo_image}</p>}
            </div>
            {formData.tattoo_image && (
              <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Selected file: {formData.tattoo_image.name}</p>
                {formData.tattoo_image.type.startsWith('image/') && (
                  <div className="relative w-20 h-20">
                    <Image
                      src={URL.createObjectURL(formData.tattoo_image)}
                      alt="Tattoo preview"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 text-white font-semibold py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Book Now'
              )}
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

