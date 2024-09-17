'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ThankYouPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Cliente';
  const date = searchParams.get('date');
  const slot = searchParams.get('slot');

  // Formatear la fecha y horario si están disponibles
  const formattedDate = date ? format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: es }) : '';
  const [startTime, endTime] = slot ? slot.split('-') : ['', ''];
  const formattedStartTime = startTime ? format(new Date(`1970-01-01T${startTime}:00`), 'h:mm a') : '';
  const formattedEndTime = endTime ? format(new Date(`1970-01-01T${endTime}:00`), 'h:mm a') : '';

  return (
    <section id="thank-you" className="py-20 bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-b-xl">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Título */}
        <h2 className="text-4xl xl:text-6xl font-extrabold text-white text-center mb-10">
          ¡Gracias por Agendar tu Consultoría, {name}!
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
            className="w-full h-80"
            fill="none"
            stroke="currentColor"
          >
            <g id="celebration">
              <circle cx="100" cy="120" r="50" fill="#FFD700" stroke="#FFA500" strokeWidth="3" />
              <circle cx="220" cy="100" r="40" fill="#FF69B4" stroke="#FF1493" strokeWidth="3" />
              <circle cx="320" cy="140" r="60" fill="#1E90FF" stroke="#4682B4" strokeWidth="3" />
              <path d="M100 170 C100 210, 90 250, 110 290" stroke="#FFA500" strokeWidth="3" fill="none" />
              <path d="M220 140 C220 180, 210 220, 230 260" stroke="#FF1493" strokeWidth="3" fill="none" />
              <path d="M320 200 C320 240, 310 280, 330 320" stroke="#4682B4" strokeWidth="3" fill="none" />
              <g id="confetti">
                <rect x="50" y="50" width="10" height="10" fill="#32CD32" transform="rotate(45 55 55)" />
                <rect x="150" y="60" width="10" height="10" fill="#FF4500" transform="rotate(45 155 65)" />
                <rect x="250" y="80" width="10" height="10" fill="#FFD700" transform="rotate(45 255 85)" />
                <rect x="320" y="40" width="10" height="10" fill="#FF69B4" transform="rotate(45 325 45)" />
                <rect x="180" y="180" width="10" height="10" fill="#1E90FF" transform="rotate(45 185 185)" />
                <rect x="300" y="240" width="10" height="10" fill="#32CD32" transform="rotate(45 305 245)" />
                <rect x="70" y="300" width="10" height="10" fill="#FFD700" transform="rotate(45 75 305)" />
              </g>
              <g id="stars">
                <polygon points="250,250 265,290 230,270 270,270 235,290" fill="#FFD700" />
                <polygon points="100,200 115,240 80,220 120,220 85,240" fill="#FF69B4" />
                <polygon points="300,300 315,340 280,320 320,320 285,340" fill="#1E90FF" />
              </g>
            </g>
          </svg>
        </h2>

        <div className="flex flex-col lg:flex-row lg:space-x-12 justify-center items-center">
          {/* Columna de texto */}
          <div className="max-w-lg bg-gray-700 p-10 rounded-lg shadow-2xl mb-10 lg:mb-0 lg:w-1/2">
            <p className="text-xl xl:text-2xl text-white mb-6">
              Nos alegra que hayas dado el primer paso hacia una mejor gestión de tu inventario. Te esperamos el <strong>{formattedDate}</strong> en el horario <strong>{formattedStartTime} - {formattedEndTime}</strong>.
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
