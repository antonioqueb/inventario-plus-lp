'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { format, parse, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';

const ThankYouPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Cliente';
  const date = searchParams.get('date');
  const slot = searchParams.get('slot') || 'Horario no especificado';

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
    return isValid(parsedDate) ? format(parsedDate, "d 'de' MMMM 'de' yyyy", { locale: es }) : '';
  };

  const formattedDate = formatDate(date);

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-900 to-zinc-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <div className="flex justify-center">
              <CheckCircleIcon className="h-20 w-20 text-green-400" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white sm:text-4xl">
              ¡Gracias por Agendar tu Consultoría, {name}!
            </h2>
            <p className="mt-4 text-xl text-zinc-300 text-center">
              Nos alegra que hayas dado el primer paso hacia una mejor gestión de tu inventario.
            </p>
          </div>
          <div className="px-6 pt-6 pb-8 bg-white bg-opacity-5 sm:px-10 sm:py-8">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-6 w-6 text-green-400" />
                <span className="text-lg font-medium text-zinc-200">{formattedDate || 'Fecha no especificada'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-6 w-6 text-green-400" />
                <span className="text-lg font-medium text-zinc-200">{slot}</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-green-600 bg-opacity-20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-2">¿Qué sigue?</h3>
                <p className="text-zinc-300">
                  Durante la sesión, identificaremos juntos las áreas clave para optimizar tu inventario,
                  y te mostraremos cómo nuestras soluciones personalizadas pueden ayudarte a mejorar la eficiencia de tus operaciones.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Ventajas de InventarioPlus</h3>
                <ul className="space-y-2 text-zinc-300">
                  {[
                    "Optimización en tiempo real para decisiones estratégicas confiables.",
                    "Soluciones personalizadas que se adaptan a tus necesidades específicas.",
                    "Automatización inteligente para reducir errores y mejorar la eficiencia.",
                    "Integración fluida con múltiples sistemas y herramientas."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-zinc-300">
                Si tienes alguna pregunta o necesitas ajustar tu cita, no dudes en contactarnos soporte@gestpro.cloud.
              </p>
              <div className="mt-8">
                <Link href="/" className="block w-full bg-green-600 text-white text-center px-5 py-3 rounded-lg text-base font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out">
                  Volver al Inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ThankYouPage: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white text-2xl">Cargando...</div>}>
      <ThankYouPageContent />
    </Suspense>
  );
};

export default ThankYouPage;