import Image from "next/image";
import copy from "./copy.json"; // Importa el archivo JSON
import Button from "./components/Button"; // Importa el nuevo componente
import CardContainer from "./components/CardContainer"; // Importa el contenedor de cards

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
          <Image
            src="/inventario.png"
            alt="Equipo de soporte"
            width={1000}
            height={400}
            className="mx-auto rounded-lg shadow-2xl hover:opacity-90 transition-all duration-300 ease-in-out backdrop-blur-lg"
          />
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
          <Image
            src="/our-mission.webp"
            alt="Nuestra misión"
            width={1000}
            height={300}
            className="mx-auto rounded-lg shadow-2xl hover:opacity-90 transition-all duration-300 ease-in-out backdrop-blur-lg"
          />
        </section>

        {/* Features Section */}
        <section className="text-center mb-20">
          <h2 className="text-4xl xl:text-6xl font-extrabold text-white mb-10">
            {copy.features.title}
          </h2>
          <CardContainer items={copy.features.items} />
          <Button text={copy.hero.button} href="#consultoria-form" />
        </section>

        {/* CTA Section */}
        <section className="text-center py-20 bg-gradient-to-r from-blue-800 to-blue-900 rounded-t-xl">
          <h2 className="text-5xl xl:text-7xl font-extrabold text-white mb-8 ">
            {copy.cta.title}
          </h2>
          <p className="text-2xl xl:text-3xl text-gray-100 max-w-3xl mx-auto mb-12 text-balance">
            {copy.cta.description}
          </p>
          <Button
            text={copy.cta.button}
            href="#consultoria-form"
            variant="white"
          />
        </section>


        {/* Formulario de Consultoría */}
        <section
          id="consultoria-form"
          className="py-20 bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-xl rounded-b-xl"
        >
          <h2 className="text-4xl xl:text-6xl font-extrabold text-white text-center mb-10">
            Obtén tu Consultoría Gratuita Ahora
          </h2>
          <form className="max-w-lg mx-auto bg-gray-700 p-10 rounded-lg shadow-2xl">
            <div className="mb-6">
              <label className="block text-white text-xl xl:text-2xl font-medium mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-xl xl:text-2xl font-medium mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-xl xl:text-2xl font-medium mb-2">
                Mensaje o Solicitud
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-extrabold hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-lg"
            >
              Enviar
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-800 p-6 text-center text-white">
        <p>© 2024 InventarioPlus - Soluciones en Inventarios</p>
      </footer>
    </div>
  );
};

export default Home;
