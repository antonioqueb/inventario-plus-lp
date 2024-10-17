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
    <section className="min-h-screen bg-gradient-to-b from-orange-900 to-zinc-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <div className="flex justify-center">
              <CheckCircleIcon className="h-20 w-20 text-orange-400" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white sm:text-4xl">
              ¡Gracias por Agendar tu Consultoría con GEC, {name}!
            </h2>
            <p className="mt-4 text-xl text-zinc-300 text-center">
              Estamos listos para acompañarte en tu camino hacia una gestión empresarial eficiente y exitosa.
            </p>
          </div>
          <div className="px-6 pt-6 pb-8 bg-white bg-opacity-5 sm:px-10 sm:py-8">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-6 w-6 text-orange-400" />
                <span className="text-lg font-medium text-zinc-200">{formattedDate || 'Fecha no especificada'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-6 w-6 text-orange-400" />
                <span className="text-lg font-medium text-zinc-200">{slot}</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-orange-600 bg-opacity-20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Próximos pasos</h3>
                <p className="text-zinc-300">
                  En nuestra consultoría, identificaremos áreas clave de mejora para tu empresa, desde la contabilidad hasta la gestión operativa.
                  Te mostraremos cómo nuestras soluciones integrales pueden llevar tu negocio al siguiente nivel.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Nuestros Servicios Principales</h3>
                <ul className="space-y-2 text-zinc-300">
                  {[
                    "Contabilidad sin complicaciones para cumplir tus obligaciones fiscales.",
                    "Consultoría empresarial para desarrollar estrategias de crecimiento.",
                    "Control interno para mejorar eficiencia y minimizar riesgos.",
                    "Auditorías en múltiples áreas para optimizar tus procesos."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-orange-400 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-zinc-300">
                ¿Tienes alguna duda o necesitas modificar tu cita? Escríbenos a 
                <a href="mailto:soporte@gestiones-empresariales-campeche.online" className="text-orange-400"> soporte@gestiones-empresariales-campeche.online</a>.
              </p>
              <div className="mt-8">
                <Link href="/" className="block w-full bg-orange-600 text-white text-center px-5 py-3 rounded-lg text-base font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out">
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
