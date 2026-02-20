'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = isLogin ? '/login' : '/usuarios';
      const payload = isLogin 
        ? { email, contrasena: password }
        : { email, contrasena: password, nombre};

      const response = await fetch(`https://bcolombiatour.fly.dev${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error en ${isLogin ? 'login' : 'registro'}`);
      }

      const data = await response.json();

      if (!isLogin) {
        if (data.Status) {
            setIsLogin(true);
            setEmail('');
            setPassword('');
            setNombre('');
            return
        }
      }
      
      // Guardar token si existe
      if (data.Status) {
        localStorage.setItem('auth',"true");
        localStorage.setItem('rol', data.rol);
        localStorage.setItem('id', data.id);
        router.push('/');
      }
      setError(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Logo/Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ColombiaTour</h1>
          <p className="text-gray-600">
            {isLogin ? 'Inicia sesión en tu cuenta' : 'Crea una nueva cuenta'}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
            <div>
              <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          {/* Mensaje de Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Botón Enviar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 hover:bg-gray-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition mb-2"
          >
            {loading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        {/* Alternancia Login/Registro */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-3">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          </p>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setEmail('');
              setPassword('');
              setNombre('');
            }}
            className="text-gray-800 font-semibold text-sm"
          >
            {isLogin ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </div>
      </div>
    </div>
  );
}
