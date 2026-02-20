import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('/collage.jpg')" }}>
      <div className="relative z-9 flex items-center justify-center h-full text-center text-white">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Conoce los lugares más emblematicos</h2>
          <p className="text-xl md:text-2xl mb-8">Descubre Colombia, crea recuerdos</p>
        </div>
      </div>
    </section>
  );
}