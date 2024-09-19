'use client';
import Image from "next/image";
import copy from "./copy.json";
import Button from "./components/Button";
import CardContainer from "./components/CardContainer";
import ContactForm from "./components/ContactForm";
import { motion } from "framer-motion"

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      {/* Hero Section */}
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

      <div className="relative z-10 flex flex-col justify-center items-center h-full bg-gradient-to-b from-black/30 via-black/50 to-black/70 backdrop-blur-[2px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl w-full px-8 py-16 rounded-[40px] bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl shadow-2xl border border-white/20 transition-all duration-300 hover:shadow-blue-500/20 hover:border-blue-500/50"
        >
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-blue-300 tracking-tight mb-8 animate-text-shimmer">
            {copy.hero.title}
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed animate-fade-in-up font-light">
            {copy.hero.description}
          </p>

          <Button text={copy.hero.button} href="#consultoria-form" /> 
        </motion.div>
      </div>
    </header>

      <main className="px-4 py-16 sm:px-6 lg:px-8 space-y-32">

      {/* <Button text={copy.hero.button} href="#consultoria-form" /> */}


        {/* Who We Are - Socios Estratégicos*/}
        <section className="text-center h-full py-8">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white mb-8">
            {copy.whoWeAre.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            {copy.whoWeAre.description}
          </p>
          <div className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Image
              src="/inventario.png"
              alt="Equipo de soporte"
              layout="responsive"
              width={1000}
              height={400}
              className="w-full "
            />
          </div>
        </section>



        {/* What We Do */}
        <section className="text-center h-full lg:py-24">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white mb-12">
            {copy.whatWeDo.title}
          </h2>
          <CardContainer items={copy.whatWeDo.services} />
          <Button text={copy.hero.button} href="#consultoria-form" />
        </section>



        {/* Our Mission */}
        <section className="text-center h-full">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white mb-8">
            {copy.ourMission.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            {copy.ourMission.description}
          </p>
          <div className="max-w-xl mx-auto rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Image
              src="/compromisotrotal.svg"
              alt="Nuestra misión"
              layout="responsive"
              width={100}
              height={100}
            />
          </div>
        </section>



        {/* Features Section */}
        <section className="text-center h-full">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white mb-8">
            {copy.features.title}
          </h2>
          <CardContainer items={copy.features.items} />
          <Button text={copy.hero.button} href="#consultoria-form" />
        </section>



        {/* Formulario de Consultoría */}
        <ContactForm />
      </main>

      <footer className="bg-gray-800 py-8 text-center text-white">
        <p className="text-lg">© 2024 InventarioPlus - Soluciones en Inventarios</p>
      </footer>
    </div>
  );
};

export default Home;