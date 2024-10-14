import React from 'react';

interface ButtonProps {
  text: string;
  href: string;
  variant?: 'default' | 'white';
}

const Button: React.FC<ButtonProps> = ({ text, href, variant = 'default' }) => {
  const baseClasses = "inline-flex justify-center items-center w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-bold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md";

  const variantClasses = {
    default: "bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 focus:ring-sky-500 my-4",
    white: "bg-white text-sky-700 border-2 border-sky-700 hover:bg-sky-50 focus:ring-sky-700 my-4"
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
