'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Tour {
  idTour: number;
  nombreDestino: string;
  descripcion: string;
  precio: number;
  imagen: string;
  estado: boolean;
  cupos_disponibles: number;
  fechaTour: string;
}

export default function TourList() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3333/tours');
      if (!response.ok) {
        throw new Error('Error al cargar los tours');
      }
      const data = await response.json();
      // Obtener solo los tours activos y limitar a 3 para destacados
      const activeTours = (data.data || data).filter((tour: Tour) => tour.estado).slice(0, 3);
      setTours(activeTours);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error fetching tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0, // 1.500.000
  maximumFractionDigits: 0 
});

  if (loading) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Conoce nuestros tours</h3>
          <div className="text-center text-gray-600">
            <p>Cargando tours...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || tours.length === 0) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Conoce nuestros tours</h3>
          <div className="text-center text-gray-600">
            <p>{error || 'No hay tours disponibles en este momento'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-center mb-12">Conoce nuestros tours</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <Link 
              key={tour.idTour} 
              href={`/tours/${tour.idTour}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
            >
              {tour.imagen && (
                <img src={tour.imagen} alt={tour.nombreDestino} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">{tour.nombreDestino}</h4>
                <p className="text-gray-600 mb-4">{tour.descripcion}</p>
                <div className="mb-4 text-sm text-gray-500">
                  <p>Fecha: {tour.fechaTour ? new Date(tour.fechaTour).toLocaleDateString('en-US') : 'N/A'}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-800">{formatter.format(tour.precio)}</span>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      // Aquí puedes agregar lógica de reserva
                    }}
                    className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}