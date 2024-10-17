import React from 'react';

interface ButtonProps {
  text: string;
  href: string;
  variant?: 'default' | 'white' | 'dark' | 'hero';
}

const Button: React.FC<ButtonProps> = ({ text, href, variant = 'default' }) => {
  const baseClasses = "inline-flex justify-center items-center w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md"; // Cambiado a rounded-md

  const variantClasses = {
    default: "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 focus:ring-orange-500 my-4 text-sm sm:text-lg",
    white: "bg-white text-orange-500 border-2 border-orange-700 hover:bg-orange-50 focus:ring-orange-700 my-4 text-sm sm:text-lg",
    dark: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-600 my-4 text-sm sm:text-lg",
    hero: "bg-white text-orange-500 border-4 border-orange-600 hover:bg-orange-50 focus:ring-orange-600 my-6 text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-5 rounded-xl shadow-lg transform hover:scale-110" // Usando rounded-lg para hero
  };

  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]}`}
      role="button"
      aria-label={text}
    >
      {text}
    </a>
  );
};

export default Button;
