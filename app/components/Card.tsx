import React from 'react';

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg shadow-lg p-6 rounded-xl mx-4 max-w-[350px] md:max-w-full transform hover:scale-105 transition-transform duration-300 ease-in-out flex-grow mb-12">
      <div className="flex flex-col justify-between h-full">
        <h3 className="text-2xl xl:text-3xl font-bold text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-400 text-base mb-6">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
