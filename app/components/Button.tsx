import React from 'react';

interface ButtonProps {
  text: string;
  href: string;
  variant?: 'default' | 'white';
}

const Button: React.FC<ButtonProps> = ({ text, href, variant = 'default' }) => {
  const baseClasses = "inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md";
  
  const variantClasses = {
    default: "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-500 my-8",
    white: "bg-white text-green-700 border-2 border-green-700 hover:bg-green-50 focus:ring-green-700 my-8"
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