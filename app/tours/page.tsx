"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Tour {
  idTour: number;
  nombreDestino: string;
  descripcion: string;
  precio: string;
  estado: boolean;
  cuposDisponibles?: number;
  imagen?: string;
  fechaTour?: string;
}

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingidTour, setEditingidTour] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Tour | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState<Partial<Tour>>({
    nombreDestino: "",
    descripcion: "",
    precio: "",
    estado: true,
    cuposDisponibles: 0,
    imagen: "",
    fechaTour: "",
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://bcolombiatour.fly.dev/tours?page=1&limit=100",
      );
      if (!response.ok) {
        throw new Error("Error al cargar los tours");
      }
      const data = await response.json();
      setTours(data.data || data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocidTouro");
      console.error("Error fetching tours:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (idTour: number) => {
    const tour = tours.find((t) => t.idTour === idTour);
    if (!tour) return;

    try {
      const response = await fetch(`https://bcolombiatour.fly.dev/tours/${idTour}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...tour,
          estado: !tour.estado,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el tour");
      }

      setTours(
        tours.map((t) =>
          t.idTour === idTour ? { ...t, estado: !t.estado } : t,
        ),
      );
    } catch (err) {
      console.error("Error updating tour:", err);
      alert("Error al actualizar el estado del tour");
    }
  };

  const handleEdit = (tour: Tour) => {
    setEditingidTour(tour.idTour);
    setEditForm({ ...tour });
  };

  const handleSaveEdit = async () => {
    if (!editForm) return;

    try {
      const response = await fetch(
        `https://bcolombiatour.fly.dev/tours/${editForm.idTour}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          nombre_destino: editForm.nombreDestino,
          descripcion: editForm.descripcion,
          precio: editForm.precio,
          cupos_disponibles: editForm.cuposDisponibles || 0,
          fecha_tour: editForm.fechaTour,
        }),
        },
      );

      if (!response.ok) {
        throw new Error("Error al guardar los cambios");
      }

      setTours(
        tours.map((tour) =>
          tour.idTour === editForm.idTour ? editForm : tour,
        ),
      );
      setEditingidTour(null);
      setEditForm(null);
    } catch (err) {
      console.error("Error saving tour:", err);
      alert("Error al guardar los cambios");
    }
  };

  const handleCancelEdit = () => {
    setEditingidTour(null);
    setEditForm(null);
  };

  const handleDelete = async (idTour: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este tour?")) {
      return;
    }

    try {
      const response = await fetch(`https://bcolombiatour.fly.dev/tours/${idTour}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el tour");
      }

      setTours(tours.filter((tour) => tour.idTour !== idTour));
    } catch (err) {
      console.error("Error deleting tour:", err);
      alert("Error al eliminar el tour");
    }
  };

  const handleCreateTour = async () => {
    if (!createForm.nombreDestino || !createForm.descripcion || !createForm.precio) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    try {
      const response = await fetch("https://bcolombiatour.fly.dev/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_destino: createForm.nombreDestino,
          descripcion: createForm.descripcion,
          precio: createForm.precio,
          estado: createForm.estado,
          cupos_disponibles: createForm.cuposDisponibles || 0,
          imagen: createForm.imagen,
          fecha_tour: createForm.fechaTour,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el tour");
      }

      const newTour = await response.json();
      setTours([...tours, newTour]);
      setIsCreateModalOpen(false);
      setCreateForm({
        nombreDestino: "",
        descripcion: "",
        precio: "",
        estado: true,
        cuposDisponibles: 0,
        imagen: "",
        fechaTour: "",
      });
      alert("Tour creado exitosamente");
    } catch (err) {
      console.error("Error creating tour:", err);
      alert("Error al crear el tour");
    }
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateForm({
      nombreDestino: "",
      descripcion: "",
      precio: "",
      estado: true,
      cuposDisponibles: 0,
      imagen: "",
      fechaTour: "",
    });
  };

  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });


  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Gestión de Tours
            </h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition"
            >
             Crear Tour
            </button>
          </div>
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
            <div className="bg-white rounded-lg shadow-md overflow-hidTourden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Imagen
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Destino
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Descripción
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Precio
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Cupos
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Fecha
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tours.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          No hay tours disponibles
                        </td>
                      </tr>
                    ) : (
                      tours.map((tour) => (
                        <tr
                          key={tour.idTour}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-sm">
                            {tour.imagen && (
                              <img
                                src={tour.imagen}
                                alt={tour.nombreDestino}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {editingidTour === tour.idTour ? (
                              <input
                                type="text"
                                value={editForm?.nombreDestino || ""}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm!,
                                    nombreDestino: e.target.value,
                                  })
                                }
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              tour.nombreDestino
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {editingidTour === tour.idTour ? (
                              <div>
                                <input
                                  type="text"
                                  value={editForm?.descripcion || ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 130) {
                                      setEditForm({
                                        ...editForm!,
                                        descripcion: value,
                                      });
                                    }
                                  }}
                                  maxLength={130}
                                  className="border rounded px-2 py-1 w-full"
                                />
                                <p className="text-xs text-gray-500 mt-1">({(editForm?.descripcion || "").length}/130)</p>
                              </div>
                            ) : (
                              tour.descripcion
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {editingidTour === tour.idTour ? (
                              <input
                                type="text"
                                value={editForm?.precio || ""}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm!,
                                    precio: e.target.value,
                                  })
                                }
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              formatter.format(Number(tour.precio))
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {editingidTour === tour.idTour ? (
                              <input
                                type="number"
                                value={editForm?.cuposDisponibles || ""}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm!,
                                    cuposDisponibles:
                                      parseInt(e.target.value) || 0,
                                  })
                                }
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              tour.cuposDisponibles || 0
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {editingidTour === tour.idTour ? (
                              <input
                                type="text"
                                value={editForm?.fechaTour || ""}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setEditForm({
                                    ...editForm!,
                                    fechaTour: value,
                                  });
                                }}
                                placeholder="MM/DD/YYYY"
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : tour.fechaTour ? (
                                 new Date(tour.fechaTour).toLocaleDateString(
                                "es-ES",
                                 )
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button
                              onClick={() => handleToggleActive(tour.idTour)}
                              disabled={editingidTour === tour.idTour}
                              className={`px-3 py-1 rounded font-semibold text-white ${
                                tour.estado
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-red-600 hover:bg-red-700"
                              } disabled:opacity-50`}
                            >
                              {tour.estado ? "Activo" : "Inactivo"}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-sm space-x-2 flex items-center">
                            {editingidTour === tour.idTour ? (
                              <>
                                <button
                                  className="flex items-center gap-2 px-2 py-2 text-gray-600 rounded-md hover:bg-green-600 transition"
                                  onClick={handleSaveEdit}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all"
                                  onClick={handleCancelEdit}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="flex items-center p-2 rounded-full hover:bg-gray-100"
                                  onClick={() => handleEdit(tour)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6 text-gray-600 hover:text-blue-600"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                    />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex items-center p-2 text-sm font-medium text-center text-red-600 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                                  onClick={() => handleDelete(tour.idTour)}
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    ></path>
                                  </svg>
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

        {/* Modal de Crear Tour */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-[#00000080] bg-opacity-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Crear Nuevo Tour</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre Destino *
                  </label>
                  <input
                    type="text"
                    value={createForm.nombreDestino || ""}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, nombreDestino: e.target.value })
                    }
                    placeholder="Ej: San Andrés"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descripción * ({(createForm.descripcion || "").length}/130)
                  </label>
                  <textarea
                    value={createForm.descripcion || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 130) {
                        setCreateForm({ ...createForm, descripcion: value });
                      }
                    }}
                    maxLength={130}
                    placeholder="Describe el tour"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 h-24 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Precio *
                    </label>
                    <input
                      type="text"
                      value={createForm.precio || ""}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, precio: e.target.value })
                      }
                      placeholder="Ej: 1800000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cupos Disponibles
                    </label>
                    <input
                      type="number"
                      value={createForm.cuposDisponibles || 0}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          cuposDisponibles: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Imagen (URL)
                  </label>
                  <input
                    type="url"
                    value={createForm.imagen || ""}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, imagen: e.target.value })
                    }
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fecha del Tour
                  </label>
                  <input
                    type="text"
                    value={createForm.fechaTour || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCreateForm({ ...createForm, fechaTour: value });
                    }}
                    placeholder="MM/DD/YYYY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    value={createForm.estado ? "activo" : "inactivo"}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        estado: e.target.value === "activo",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleCloseCreateModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateTour}
                  className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded-lg font-semibold"
                >
                  Crear Tour
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
