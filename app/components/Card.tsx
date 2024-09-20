import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="group my-14 bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full">
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center mb-4">
            <h3 className="text-xl 2xl:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3>
          </div>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            {description}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="w-12 h-1 bg-blue-500 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300 ease-out"></div>
          <ArrowRight className="w-6 h-6 text-blue-400 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Card;