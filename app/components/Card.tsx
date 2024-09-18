import React from 'react';

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="group my-14 bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full">
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            {description}
          </p>
        </div>
        <div className="mt-auto">
          <div className="w-12 h-1 bg-blue-500 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300 ease-out"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;