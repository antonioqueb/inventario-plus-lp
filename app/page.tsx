'use client'

import Image from "next/image"
import copy from "./copy.json"
import Button from "./components/Button"
import CardContainer from "./components/CardContainer"
import ContactForm from "./components/ContactForm"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      {/* Hero Section */}
      <header className="relative h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 scale-110 transform"
      >
        <source src="/4477603-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col justify-center items-center h-full bg-gradient-to-b from-black/40 via-black/60 to-black/80 backdrop-blur-[2px]"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl xl:max-w-7xl w-11/12 xl:w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 my-8 sm:my-12 md:my-16 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl shadow-2xl border border-white/20 transition-all duration-300 hover:shadow-blue-500/20 hover:border-blue-500/50"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-blue-300 tracking-tight mb-4 sm:mb-6 md:mb-8 animate-text-shimmer"
          >
            {copy.hero.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl leading-relaxed animate-fade-in-up font-light"
          >
            {copy.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 sm:mt-8 md:mt-10"
          >
           <Button text={copy.hero.button} href="#consultoria-form" />
          </motion.div>
        </motion.div>
      </motion.div>
    </header>
{/* <Button text={copy.hero.button} href="#consultoria-form" /> */}
      <main className="px-4 py-16 sm:px-6 lg:px-8 space-y-32">
        {/* Who We Are - Socios Estratégicos*/}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center h-full py-8"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white mb-8"
          >
            {copy.whoWeAre.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            {copy.whoWeAre.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Image
              src="/inventario.png"
              alt="Equipo de soporte"
              layout="responsive"
              width={1000}
              height={400}
              className="w-full"
            />
          </motion.div>
        </motion.section>

        {/* What We Do */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center h-full lg:py-24"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white mb-12"
          >
            {copy.whatWeDo.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CardContainer items={copy.whatWeDo.services} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button text={copy.hero.button} href="#consultoria-form" />
          </motion.div>
        </motion.section>

        {/* Our Mission */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center h-full"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white mb-8"
          >
            {copy.ourMission.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            {copy.ourMission.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Image
              src="/compromisotrotal.svg"
              alt="Nuestra misión"
              layout="responsive"
              width={100}
              height={100}
            />
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center h-full"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white mb-8"
          >
            {copy.features.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CardContainer items={copy.features.items} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button text={copy.hero.button} href="#consultoria-form" />
          </motion.div>
        </motion.section>

        {/* Formulario de Consultoría */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <ContactForm />
        </motion.div>
      </main>

      <footer className="bg-gray-800 py-8 text-center text-white">
        <p className="text-lg">© 2024 InventarioPlus - Soluciones en Inventarios</p>
      </footer>
    </div>
  )
}



