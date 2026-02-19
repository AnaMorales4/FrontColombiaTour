interface Tour {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

const tours: Tour[] = [
  {
    id: 1,
    title: 'Cartagena',
    description: 'Explora la ciudad amurallada y sus playas.',
    price: '$150',
    image: '/cartagena.jpg',
  },
  {
    id: 2,
    title: 'San Andrés Islas',
    description: 'Islas paradisíacas con snorkel y buceo.',
    price: '$200',
    image: '/sanandres.jpg',
  },
  {
    id: 3,
    title: 'Eje Cafetero',
    description: 'Recorre fincas de café y paisajes verdes.',
    price: '$120',
    image: '/cafetero.jpg',
  },
];

export default function TourList() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-center mb-12">Tours Destacados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">{tour.title}</h4>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">{tour.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}