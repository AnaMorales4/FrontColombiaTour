'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Tour {
  id: number;
  nombre_destino: string;
  descripcion: string;
  precio: string;
  estado: boolean;
  cupos_disponibles?: number;
  imagen?: string;
  fecha_tour?: string;
}

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Tour | null>(null);

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
      setTours(data.data || data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error fetching tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: number) => {
    const tour = tours.find(t => t.id === id);
    if (!tour) return;

    try {
      const response = await fetch(`http://localhost:3333/tours/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tour,
          estado: !tour.estado,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el tour');
      }

      setTours(tours.map(t => 
        t.id === id ? { ...t, estado: !t.estado } : t
      ));
    } catch (err) {
      console.error('Error updating tour:', err);
      alert('Error al actualizar el estado del tour');
    }
  };

  const handleEdit = (tour: Tour) => {
    setEditingId(tour.id);
    setEditForm({ ...tour });
  };

  const handleSaveEdit = async () => {
    if (!editForm) return;

    try {
      const response = await fetch(`http://localhost:3333/tours/${editForm.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }

      setTours(tours.map(tour => 
        tour.id === editForm.id ? editForm : tour
      ));
      setEditingId(null);
      setEditForm(null);
    } catch (err) {
      console.error('Error saving tour:', err);
      alert('Error al guardar los cambios');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este tour?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/tours/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el tour');
      }

      setTours(tours.filter(tour => tour.id !== id));
    } catch (err) {
      console.error('Error deleting tour:', err);
      alert('Error al eliminar el tour');
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestión de Tours</h1>
          
          {loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
              <p className="text-blue-800 font-semibold">Cargando tours...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center mb-8">
              <p className="text-red-800 font-semibold">{error}</p>
              <button 
                onClick={fetchTours}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Reintentar
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Imagen</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Destino</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Descripción</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Precio</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cupos</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fecha</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estado</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tours.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          No hay tours disponibles
                        </td>
                      </tr>
                    ) : (
                      tours.map((tour) => (
                        <tr key={tour.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm">
                            {tour.imagen && (
                              <img src={tour.imagen} alt={tour.nombre_destino} className="w-16 h-16 object-cover rounded" />
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {editingId === tour.id ? (
                              <input
                                type="text"
                                value={editForm?.nombre_destino || ''}
                                onChange={(e) => setEditForm({ ...editForm!, nombre_destino: e.target.value })}
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              tour.nombre_destino
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {editingId === tour.id ? (
                              <input
                                type="text"
                                value={editForm?.descripcion || ''}
                                onChange={(e) => setEditForm({ ...editForm!, descripcion: e.target.value })}
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              tour.descripcion
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {editingId === tour.id ? (
                              <input
                                type="text"
                                value={editForm?.precio || ''}
                                onChange={(e) => setEditForm({ ...editForm!, precio: e.target.value })}
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              tour.precio
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {editingId === tour.id ? (
                              <input
                                type="number"
                                value={editForm?.cupos_disponibles || ''}
                                onChange={(e) => setEditForm({ ...editForm!, cupos_disponibles: parseInt(e.target.value) || 0 })}
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              tour.cupos_disponibles || 0
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {editingId === tour.id ? (
                              <input
                                type="date"
                                value={editForm?.fecha_tour || ''}
                                onChange={(e) => setEditForm({ ...editForm!, fecha_tour: e.target.value })}
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              tour.fecha_tour ? new Date(tour.fecha_tour).toLocaleDateString('es-ES') : 'N/A'
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button
                              onClick={() => handleToggleActive(tour.id)}
                              disabled={editingId === tour.id}
                              className={`px-3 py-1 rounded font-semibold text-white ${
                                tour.estado
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : 'bg-red-600 hover:bg-red-700'
                              } disabled:opacity-50`}
                            >
                              {tour.estado ? 'Activo' : 'Inactivo'}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-sm space-x-2">
                            {editingId === tour.id ? (
                              <>
                                <button
                                  onClick={handleSaveEdit}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded font-semibold"
                                >
                                  Guardar
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded font-semibold"
                                >
                                  Cancelar
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(tour)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded font-semibold"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => handleDelete(tour.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-semibold"
                                >
                                  Eliminar
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}