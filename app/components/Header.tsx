'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import  Button  from "./Button";
import { ChevronRight, BarChart2, Clock, Database } from 'lucide-react';
import copy from "./../copy.json";

export default function HeroModerno() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6"
          variants={itemVariants}
        >
          Soluciones de Software Especializadas para el Control de Inventarios en México
        </motion.h1>
        <motion.p
          className="mt-3 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          ¿Tu empresa enfrenta problemas con el control de inventarios y la gestión de operaciones?
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          variants={itemVariants}
        >
          <div className="flex items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-full px-4 py-2">
            <BarChart2 className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-gray-300">Optimización de inventarios</span>
          </div>
          <div className="flex items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-full px-4 py-2">
            <Clock className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-gray-300">Gestión en tiempo real</span>
          </div>
          <div className="flex items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-full px-4 py-2">
            <Database className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-gray-300">Control de stock eficiente</span>
          </div>
        </motion.div>
        <motion.div className="mt-10" variants={itemVariants}>
        <Button variant="hero" text={copy.hero.button} href="#consultoria-form" />
        </motion.div>
        <motion.p className="mt-6 text-sm text-gray-400" variants={itemVariants}>
          Mejora la eficiencia y reduce errores con nuestras soluciones adaptadas a tu negocio
        </motion.p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
    </div>
  );
}
