'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Tour {
  idTour: number;
  nombreDestino: string;
  descripcion: string;
  precio: string;
  estado: boolean;
  cuposDisponibles: number;
  imagen: string;
  fechaTour: string;
}

interface Tiquete {
  idTiquete: number;
  usuarioId: number;
  tourId: number;
  cantPersonas: number;
  total: string;
  fechaCompra: string;
  tour: Tour;
}

export default function MisTiquetes() {
  const [tiquetes, setTiquetes] = useState<Tiquete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTiquetes();
  }, []);

  const fetchTiquetes = async () => {
    try {
      setLoading(true);
      const usuarioId = localStorage.getItem('id');
      if (!usuarioId) {
        throw new Error('Usuario no autenticado');
      }
      const response = await fetch(`http://localhost:3333/misTiquetes/${usuarioId}`);
      if (!response.ok) {
        throw new Error('Error al cargar los tiquetes');
      }
      const data = await response.json();
      setTiquetes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error fetching tiquetes:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

    const handleCantPersonasChange = async (idTiquete: number, newCantPersonas: number) => {  

        try {
          const response = await fetch(`http://localhost:3333/tiquetes/${idTiquete}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cant_personas: newCantPersonas }),
          });
            if (!response.ok) {
                const errorData = await response.json();    
                throw new Error(errorData.message || 'Error al actualizar la cantidad de personas');
            }
            const updatedTiquete = await response.json();

            if (updatedTiquete.message) {
                alert(updatedTiquete.message);
                return;
            }
            setTiquetes((prevTiquetes) =>
                prevTiquetes.map((tiquete) =>
                    tiquete.idTiquete === idTiquete ? {
                        ...tiquete,
                         cantPersonas: updatedTiquete.cantPersonas,
                         total: updatedTiquete.total
                        } : tiquete
                )
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error updating cant_personas:', err);
        }
    }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <section className="flex-grow py-16 bg-gray-100 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-center mb-12">Mis Tiquetes</h3>
            <div className="text-center text-gray-600">
              <p>Cargando tiquetes...</p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error || tiquetes.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <section className="flex-grow py-16 bg-gray-100 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-center mb-12">Mis Tiquetes</h3>
            <div className="text-center text-gray-600">
              <p>{error || 'No tienes tiquetes comprados'}</p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="flex-grow py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Mis Tiquetes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tiquetes.map((tiquete) => (
              <div
                key={tiquete.idTiquete}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {tiquete.tour.imagen && (
                  <img src={tiquete.tour.imagen} alt={tiquete.tour.nombreDestino} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{tiquete.tour.nombreDestino}</h4>
                  <p className="text-gray-600 mb-4">{tiquete.tour.descripcion}</p>
                  <div className="mb-4 text-sm text-gray-500">
                    <p>Fecha del Tour: {tiquete.tour.fechaTour ? new Date(tiquete.tour.fechaTour).toLocaleDateString('es-ES') : 'N/A'}</p>
                    <p>Fecha de Compra: {new Date(tiquete.fechaCompra).toLocaleDateString('es-ES')}</p>
                    <p>Cantidad de tiquetes: <input type="number" className='border border-gray-300 rounded px-2 py-1 w-16' value={tiquete.cantPersonas} onChange={(e) => handleCantPersonasChange(tiquete.idTiquete, parseInt(e.target.value))}/></p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-800">Total: {formatter.format(parseInt(tiquete.total))}</span>
                    <span className="text-sm text-gray-500">ID Tiquete: {tiquete.idTiquete}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}