"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50">
        {/* Sección Quiénes Somos */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Texto a la izquierda */}
              <div className="order-2 md:order-1">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">¿Quiénes somos?</h2>
                <p className="text-lg text-gray-600 mb-4">
                  Colombia Tour es una empresa líder en el turismo colombiano, dedicada a ofrecer experiencias 
                  inolvidables a través de nuestros tours cuidadosamente diseñados.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  Con más de 10 años de experiencia en la industria, hemos ayudado a miles de turistas a descubrir 
                  la belleza y diversidad de Colombia, desde sus playas paradisíacas hasta sus montañas nevadas.
                </p>
                <p className="text-lg text-gray-600">
                  Nuestro equipo de profesionales está comprometido en brindarte el mejor servicio y asegurar que 
                  cada viaje sea una experiencia perfecta llena de aventura, cultura y naturaleza.
                </p>
              </div>

              {/* Imagen a la derecha */}
              <div className="order-1 md:order-2">
                <img src="https://www.onvacation.com/wp-content/uploads/2024/10/quienes-somos.png" alt="Quiénes Somos" className="rounded-lg h-96 w-full object-cover shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Sección Qué Ofrecemos */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Imagen a la izquierda */}
              <div>
                <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center shadow-lg">
                  <div className="text-center text-gray-500">
                    <img src="https://www.onvacation.com/wp-content/uploads/2024/10/nuestros-hoteles.png" alt="Qué Ofrecemos" className="rounded-lg h-96 w-full object-cover shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Texto a la derecha */}
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">¿Qué ofrecemos?</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Tours Personalizados</h3>
                    <p className="text-gray-600">
                      Diseñamos itinerarios a medida según tus intereses y preferencias, garantizando una experiencia única y memorable.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Guías Profesionales</h3>
                    <p className="text-gray-600">
                      Contamos con guías bilingües capacitados que comparten el conocimiento y pasión por nuestro país.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Precios Competitivos</h3>
                    <p className="text-gray-600">
                      Ofrecemos las mejores opciones de viaje con excelente relación precio-calidad y paquetes flexibles.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Seguridad y Confort</h3>
                    <p className="text-gray-600">
                      Tu seguridad es nuestra prioridad. Contamos con vehículos seguros, seguros de viaje y asistencia 24/7.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Políticas */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Políticas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Política de Cancelación */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Política de Cancelación</h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>Cancelación con 30 días: reembolso 100%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>Cancelación con 15 días: reembolso 75%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>Cancelación con menos de 15 días: reembolso 25%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>No se aceptan cancelaciones 7 días antes del tour</span>
                  </li>
                </ul>
              </div>

              {/* Política de Privacidad */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Política de Privacidad</h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>Protegemos tu información personal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>No compartimos datos con terceros</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>Usamos encriptación de datos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>Cumplimos con leyes de protección de datos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>Puedes solicitar tu información en cualquier momento</span>
                  </li>
                </ul>
              </div>

              {/* Política de Reembolso */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Política de Reembolso</h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>Reembolsos procesados en 5-10 días hábiles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>Se devuelven a la cuenta original de pago</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>Cancelaciones por fuerza mayor reeembolso 100%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 font-bold mr-3">•</span>
                    <span>Aplican términos y condiciones del tour</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Contacto */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Tienes Preguntas?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Contactanos y nuestro equipo estará encantado de ayudarte
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
