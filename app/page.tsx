'use client'

import Image from "next/image"
import copy from "./copy.json"
import Button from "./components/Button"
import CardContainer from "./components/CardContainer"
import ContactForm from "./components/ContactForm"
import { motion } from "framer-motion"
import Header from './components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      {/* Hero Section */}



      <Header />







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
            className="text-xl md:text-2xl text-zinc-300 max-w-7xl mx-auto mb-12 leading-relaxed"
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
              src="/inventario.jpg"
              alt="POS"
              layout="responsive"
              width={4000}
              height={200}
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
            className="text-xl md:text-2xl text-zinc-300 max-w-7xl mx-auto mb-12 leading-relaxed"
          >
            {copy.ourMission.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Image
              src="/inventario.png"
              alt="Nuestra misión"
              layout="responsive"
              width={90}
              height={90}
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

      <footer className="bg-zinc-800 py-8 text-center text-white">
        <p className="text-lg">© GEC - Gestiones Empresariales de Campeche, S.C.</p>
      </footer>
    </div>
  )
}



