'use client'

import { motion, useReducedMotion } from 'framer-motion';
import copy from '../copy.json';
import Button from "./Button"; // Asegurándome de usar tu botón personalizado

export default function Header() {
  const prefersReducedMotion = useReducedMotion();

  // Variantes para animaciones, respetando la preferencia de movimiento reducido
  const containerVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, ease: 'easeOut' },
      };

  const titleVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: 0.2, duration: 0.8, ease: 'easeOut' },
      };

  const descriptionVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.4, duration: 0.8, ease: 'easeOut' },
      };

  const buttonVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: 0.6, duration: 0.8, ease: 'easeOut' },
      };

  return (
    <header className="relative h-screen flex items-center justify-center" role="banner">
      {/* Fondo de video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/pos.mp4"
        autoPlay
        loop
        muted
        aria-hidden="true"
      />

      {/* Filtro oscuro para mejorar el contraste */}
      <div className="absolute inset-0 bg-black opacity-70 z-1" aria-hidden="true"></div>
      
      {/* Contenido */}
      <motion.div 
        className="relative z-10 w-full max-w-6xl px-6 py-20 text-center"
        initial={containerVariants.initial}
        animate={containerVariants.animate}
        transition={containerVariants.transition}
      >
        <motion.h1 
          className="text-7xl font-extrabold text-white mb-7"
          initial={titleVariants.initial}
          animate={titleVariants.animate}
          transition={titleVariants.transition}
        >
          {copy.hero.title}
        </motion.h1>
        
        <motion.p 
          className="text-3xl text-white mb-10"
          initial={descriptionVariants.initial}
          animate={descriptionVariants.animate}
          transition={descriptionVariants.transition}
        >
          {copy.hero.description}
        </motion.p>

        <motion.div
          initial={buttonVariants.initial}
          animate={buttonVariants.animate}
          transition={buttonVariants.transition}
        >
           <Button variant="hero" text={copy.hero.button} href="#consultoria-form" />
        </motion.div>
      </motion.div>
    </header>
  );
}
