// app/components/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="group my-14 bg-gradient-to-br from-zinc-800 to-zinc-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full">
      {/* Contenedor del contenido principal */}
      <div className="p-6 flex flex-col justify-between h-full">
        <div className="flex-1 flex flex-col items-center text-center">
          <h3 className="text-xl 2xl:text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300 mb-4">
            {title}
          </h3>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Línea decorativa (mantiene su posición al fondo del card) */}
        <div className="mt-auto">
          <div className="w-12 h-1 bg-orange-500 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300 ease-out"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
