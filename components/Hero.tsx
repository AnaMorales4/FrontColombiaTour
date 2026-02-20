import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('/collage.jpg')" }}>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Conoce los lugares más emblematicos</h2>
          <p className="text-xl md:text-2xl mb-8">Descubre Colombia, crea recuerdos</p>
          <Link href="/tours" className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded inline-block">
            Explorar Tours
          </Link>
        </div>
      </div>
    </section>
  );
}