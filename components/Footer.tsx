import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8  bottom-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image src="/logo.png" alt="Logo" width={50} height={50} />
              <h5 className="text-lg font-semibold ml-4">Colombia Tour</h5>
            </div>
            <p>Es una agencia de viajes dedicada a ofrecer experiencias únicas en Colombia. 
                Diseñamos itinerarios personalizados para turistas que buscan descubrir la belleza y cultura del país.</p>
          </div>
          <div>
            <h6 className="text-lg font-semibold mb-4">Contacto</h6>
            <p>Email: info@colombiatour.com</p>
            <p>Tel: +57 123 456 789</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; 2026 ColombiaTour. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}