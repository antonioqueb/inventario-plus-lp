'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';  // Importar useSearchParams para obtener los parámetros de la URL
import Link from 'next/link';

const ThankYouPage: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Cliente';
  const date = searchParams.get('date');
  const slot = searchParams.get('slot');

  return (
    <section id="thank-you" className="py-20 bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-xl rounded-b-xl">
      <h2 className="text-4xl xl:text-6xl font-extrabold text-white text-center mb-10">
        ¡Gracias por Agendar tu Consultoría, {name}!
      </h2>

      <div className="max-w-lg mx-auto bg-gray-700 p-10 rounded-lg shadow-2xl">
        <p className="text-xl xl:text-2xl text-white mb-6">
          Nos alegra que hayas dado el primer paso hacia una mejor gestión de tu inventario. Te esperamos el <strong>{date}</strong> en el horario <strong>{slot}</strong>.
        </p>

        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-2xl xl:text-3xl font-bold mb-2">¿Qué sigue?</h3>
          <p className="text-lg xl:text-xl">
            Durante la sesión, identificaremos juntos las áreas clave para optimizar tu inventario, 
            y te mostraremos cómo nuestras soluciones personalizadas pueden ayudarte a mejorar la eficiencia de tus operaciones.
          </p>
        </div>

        <h3 className="text-2xl xl:text-3xl font-bold text-white mb-4">Ventajas de InventarioPlus</h3>
        <ul className="list-disc list-inside text-lg xl:text-xl text-white mb-6">
          <li>Optimización en tiempo real para decisiones estratégicas confiables.</li>
          <li>Soluciones personalizadas que se adaptan a tus necesidades específicas.</li>
          <li>Automatización inteligente para reducir errores y mejorar la eficiencia.</li>
          <li>Integración fluida con múltiples sistemas y herramientas.</li>
        </ul>

        <p className="text-xl xl:text-2xl text-white mb-6">
          Si tienes alguna pregunta o necesitas ajustar tu cita, no dudes en contactarnos.
        </p>

        <Link href="/">
          <span className="block text-center bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-extrabold hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-lg cursor-pointer">
            Volver al Inicio
          </span>
        </Link>
      </div>
    </section>
  );
};

export default ThankYouPage;
