'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ThankYouPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Cliente';
  const date = searchParams.get('date');
  const slot = searchParams.get('slot');

  return (
    <section id="thank-you" className="py-20 bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-xl rounded-b-xl">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Título */}
        <h2 className="text-4xl xl:text-6xl font-extrabold text-white text-center mb-10">
          ¡Gracias por Agendar tu Consultoría, {name}!
        </h2>

        <div className="flex flex-col lg:flex-row lg:space-x-12 justify-center items-center">
          {/* Columna de texto */}
          <div className="max-w-lg bg-gray-700 p-10 rounded-lg shadow-2xl mb-10 lg:mb-0 lg:w-1/2">
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

          {/* Imagen o elemento decorativo */}
          <div className="hidden lg:block lg:w-1/2">
            {/* Aquí puedes agregar una imagen, gráfico o ilustración */}
            <div className="bg-gray-500 w-full h-80 rounded-lg shadow-lg bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
              {/* Contenido opcional para la imagen */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ThankYouPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ThankYouPageContent />
    </Suspense>
  );
};

export default ThankYouPage;
