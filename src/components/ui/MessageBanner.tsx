import React, {useEffect } from 'react'; // Added missing import for useEffect
import { X } from 'lucide-react';

interface MessageBannerProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const MessageBanner: React.FC<MessageBannerProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Corrected here: you need to call the function
    }, 7000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [onClose]); // Add onClose as a dependency to ensure it's correctly handled

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg flex items-center justify-between ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      <p className="text-white mr-4">{message}</p>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default MessageBanner;

