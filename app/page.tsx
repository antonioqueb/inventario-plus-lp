import Image from "next/image";
import copy from "./copy.json";
import Button from "./components/Button";
import CardContainer from "./components/CardContainer";
import ContactForm from "./components/ContactForm";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <header className="relative h-screen text-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://videos.pexels.com/video-files/4477603/4477603-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>

        <div className="relative z-10 flex flex-col justify-center items-center h-full bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl mb-6">
            {copy.hero.title}
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-200 drop-shadow-lg max-w-4xl mx-auto px-4 leading-relaxed">
            {copy.hero.description}
          </p>

          <Button text={copy.hero.button} href="#consultoria-form" />
        </div>
      </header>

      <main className="px-4 py-16 sm:px-6 lg:px-8 space-y-32">
        {/* Who We Are */}
        <section className="text-center">
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
              className="w-full"
            />
          </div>
        </section>

        {/* What We Do */}
        <section className="text-center">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white mb-8">
            {copy.whatWeDo.title}
          </h2>
          <CardContainer items={copy.whatWeDo.services} />
          <Button text={copy.hero.button} href="#consultoria-form"  />
        </section>

        {/* Our Mission */}
        <section className="text-center">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white mb-8">
            {copy.ourMission.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            {copy.ourMission.description}
          </p>
          <div className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Image
              src="/our-mission.webp"
              alt="Nuestra misión"
              layout="responsive"
              width={1000}
              height={300}
              className="w-full"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="text-center">
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