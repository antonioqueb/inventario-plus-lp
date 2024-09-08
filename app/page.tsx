import Image from "next/image";
import copy from "./copy.json"; // Importa el archivo JSON
import Button from "./components/Button"; // Importa el nuevo componente
import CardContainer from "./components/CardContainer"; // Importa el contenedor de cards
import ContactForm from "./components/ContactForm"; // Importa el formulario de contacto

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <header className="relative h-[50vh] text-center">
        {/* Video de fondo */}
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

        {/* Contenido del Hero */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full bg-black bg-opacity-50 backdrop-blur-lg shadow-lg rounded-lg">
          <h1 className="text-4xl xl:text-7xl 2xl:text-8xl font-extrabold text-white tracking-wide drop-shadow-lg">
            {copy.hero.title}
          </h1>

          <p className="mt-6 text-xl xl:text-2xl text-white drop-shadow-lg max-w-4xl mx-auto text-balance">
            {copy.hero.description}
          </p>

          <Button text={copy.hero.button} href="#consultoria-form" />
        </div>
      </header>

      <main className="px-8 py-12 sm:px-12 lg:px-24">
        {/* Who We Are */}
        <section className="text-center mb-20">
          <h2 className="text-4xl xl:text-6xl font-extrabold text-white mb-10">
            {copy.whoWeAre.title}
          </h2>
          <p className="text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 text-balance">
            {copy.whoWeAre.description}
          </p>
          <div className="max-w-6xl mx-auto"> {/* Usamos el mismo ancho que el contenedor CTA */}
            <Image
              src="/inventario.png"
              alt="Equipo de soporte"
              layout="responsive"
              width={1000}
              height={400}
              className="mx-auto w-full rounded-lg shadow-2xl hover:opacity-90 transition-all duration-300 ease-in-out backdrop-blur-lg"
            />
          </div>
        </section>

        {/* What We Do */}
        <section className="text-center mb-20">
          <h2 className="text-4xl xl:text-6xl font-extrabold text-white mb-10">
            {copy.whatWeDo.title}
          </h2>
          <CardContainer items={copy.whatWeDo.services} />
          <Button text={copy.hero.button} href="#consultoria-form" />
        </section>

        {/* Our Mission */}
        <section className="text-center mb-20">
          <h2 className="text-4xl xl:text-6xl font-extrabold text-white mb-10">
            {copy.ourMission.title}
          </h2>
          <p className="text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 text-balance">
            {copy.ourMission.description}
          </p>
          <div className="max-w-6xl mx-auto">
            <Image
              src="/our-mission.webp"
              alt="Nuestra misión"
              layout="responsive"
              width={1000}
              height={300}
              className="mx-auto w-full rounded-lg shadow-2xl hover:opacity-90 transition-all duration-300 ease-in-out backdrop-blur-lg"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="text-center mb-20">
          <h2 className="text-4xl xl:text-6xl font-extrabold text-white mb-10">
            {copy.features.title}
          </h2>
          <CardContainer items={copy.features.items} />
          <Button text={copy.hero.button} href="#consultoria-form" />
        </section>

        {/* Formulario de Consultoría */}
        <ContactForm /> {/* Incluimos el formulario de contacto externo */}

      </main>

      <footer className="bg-gray-800 p-6 text-center text-white">
        <p>© 2024 InventarioPlus - Soluciones en Inventarios</p>
      </footer>
    </div>
  );
};

export default Home;
