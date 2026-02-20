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
  cuposDisponibles: number;
  fechaTour: string;
}

interface CompraForm {
  nombre: string;
  email: string;
  cantidadPersonas: number;
}

export default function TourList() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tourSeleccionado, setTourSeleccionado] = useState<Tour | null>(null);
  const [formCompra, setFormCompra] = useState<CompraForm>({
    nombre: '',
    email: '',
    cantidadPersonas: 1,
  });
  const [procesandoCompra, setProcesandoCompra] = useState(false);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3333/tours?limit=100');
      if (!response.ok) {
        throw new Error('Error al cargar los tours');
      }
      const data = await response.json();
      // Obtener solo los tours activos 
      const activeTours = (data.data || data);
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
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  });

  const abrirModal = (tour: Tour) => {
    setTourSeleccionado(tour);
    //setFormCompra({ nombre: '', email: '', cantidadPersonas: 1 });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setTourSeleccionado(null);
    setFormCompra({ nombre: '', email: '', cantidadPersonas: 1 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormCompra({
      ...formCompra,
      [name]: name === 'cantidadPersonas' ? parseInt(value) || 1 : value,
    });
  };

  const calcularTotal = (): number => {
    if (!tourSeleccionado) return 0;
    return tourSeleccionado.precio * formCompra.cantidadPersonas;
  };

  const handleConfirmarCompra = async () => {
    if (!tourSeleccionado) return;

    // Validar campos
    if (!formCompra.nombre.trim() || !formCompra.email.trim() || formCompra.cantidadPersonas < 1) {
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    // Validar cantidad disponible
    if (formCompra.cantidadPersonas > tourSeleccionado.cuposDisponibles) {
      alert(`Solo hay ${tourSeleccionado.cuposDisponibles} cupos disponibles`);
      return;
    }

    setProcesandoCompra(true);

    try {
      // Aquí iría la llamada al backend para procesar la compra
      const response = await fetch('http://localhost:3333/tiquetes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tour_id: tourSeleccionado.idTour,
          usuario_id: localStorage.getItem('id'),
          cant_personas: formCompra.cantidadPersonas,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la compra');
      }

      alert('¡Compra realizada exitosamente!');
      cerrarModal();
      fetchTours();
      // Aquí podrías redirigir a una página de confirmación
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al procesar la compra');
      console.error('Error en compra:', err);
    } finally {
      setProcesandoCompra(false);
    }
  };

  //fincion para capturar el click y ver si tengo session y traer la infoormacion del usuaio con un get


  const handleClick = async (tour:Tour) => {
        if (typeof window !== 'undefined') {
            const auth = localStorage.getItem('auth');
            if (auth === 'true') {
              const response = await fetch(`http://localhost:3333/usuarios/${localStorage.getItem('id')}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
              });

                    
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Error al obtener información del usuario');
            }

             const usuario = await response.json();

              setFormCompra({
                ...formCompra,
                nombre:  usuario.nombre,
                email: usuario.email
              });

              abrirModal(tour);
            }else{
              alert('Debes iniciar sesión para reservar un tour');
              location.href = '/login';
            }
          }   
  }



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
              href={``}
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
                    onClick={(e) => {e.preventDefault(); handleClick(tour)}}
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

      {/* Modal de Compra */}
      {modalAbierto && tourSeleccionado && (
        <div className="fixed inset-0 bg-[#00000030] bg-opacity-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Compra de Tiquete</h2>
            <p className="text-gray-600 mb-4">{tourSeleccionado.nombreDestino}</p>

            {/* Campos del formulario */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  disabled
                  value={formCompra.nombre}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  disabled
                  value={formCompra.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad de Personas
                </label>
                <input
                  type="number"
                  name="cantidadPersonas"
                  value={formCompra.cantidadPersonas}
                  onChange={handleInputChange}
                  min="1"
                  max={tourSeleccionado.cuposDisponibles}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
                <p className="text-xs text-gray-500 mt-1">Cupos disponibles: {tourSeleccionado.cuposDisponibles}</p>
              </div>
            </div>

            {/* Resumen de precios */}
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Precio por persona:</span>
                <span className="font-semibold">{formatter.format(tourSeleccionado.precio)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Cantidad:</span>
                <span className="font-semibold">{formCompra.cantidadPersonas}</span>
              </div>
              <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between">
                <span className="text-lg font-bold text-gray-800">Total a pagar:</span>
                <span className="text-lg font-bold text-gray-800">{formatter.format(calcularTotal())}</span>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={cerrarModal}
                disabled={procesandoCompra}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarCompra}
                disabled={procesandoCompra}
                className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50"
              >
                {procesandoCompra ? 'Procesando...' : 'Confirmar Compra'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}