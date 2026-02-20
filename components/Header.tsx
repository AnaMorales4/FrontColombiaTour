"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
      if (typeof window !== 'undefined') {
        const auth = localStorage.getItem('auth');
        if (auth === 'true') {
          const storedRol = localStorage.getItem('rol');
          setRol(storedRol);
        } else {
          localStorage.removeItem('rol');
        }
      }
  }, [])


  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('rol');
    setRol(null);
  }

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Colombia Tour Logo" width={50} height={50} />
            <h1 className="text-2xl font-bold text-white">ColombiaTour</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-gray-300">Inicio</Link>
            {rol === 'admin' && <Link href="/tours" className="text-white hover:text-gray-300">Tours</Link>}
            <Link href="/about" className="text-white hover:text-gray-300">Acerca de</Link>
            {rol ? ( <Link href="/login" onClick={handleLogout} className="text-white hover:text-gray-300">Cerrar Sesión</Link>):(
               <Link href="/login" className="text-white hover:text-gray-300">Iniciar Sesión</Link>
            )}
          
          </nav>
        </div>
      </div>
    </header>
  );
}