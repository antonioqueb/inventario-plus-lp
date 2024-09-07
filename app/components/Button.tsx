// Button.tsx
interface ButtonProps {
    text: string;
    href: string;
    variant?: 'default' | 'white'; // Añadimos la variante
  }
  
  const Button = ({ text, href, variant = 'default' }: ButtonProps) => {
    // Definimos las clases dependiendo de la variante
    const buttonClass =
      variant === 'white'
        ? 'bg-white text-blue-700 border-blue-700 border-2 hover:bg-blue-50'
        : 'bg-blue-700 text-white hover:bg-blue-600';
  
    return (
      <a href={href} className="mt-4">
        <button
          className={`${buttonClass} px-10 py-4 rounded-full text-lg font-extrabold hover:scale-105 transition-all duration-300 ease-in-out shadow-lg`}
        >
          {text}
        </button>
      </a>
    );
  };
  
  export default Button;
  