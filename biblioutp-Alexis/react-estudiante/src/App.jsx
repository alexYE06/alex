import { useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import db from './data/db.json';
import { crearGeneradorCodigos } from './core/estadisticas.js';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import RutaProtegida from './components/RutaProtegida';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import DetalleLibro from './pages/DetalleLibro';
import Login from './pages/Login';
import MisPrestamos from './pages/MisPrestamos';
import NuevoPrestamo from './pages/NuevoPrestamo';
import NoEncontrado from './pages/NoEncontrado';

function AppRutas() {
  const [libros, setLibros] = useState(db.libros);
  const [prestamos, setPrestamos] = useState(db.prestamos);
  const { usuario } = useAuth();
  const generarCodigo = useRef(crearGeneradorCodigos('PRE', db.prestamos.length + 1));

  const agregarPrestamo = ({ libroId, fechaPrestamo, fechaDevolucion }) => {
    const nuevo = {
      id: prestamos.length + 1,
      codigo: generarCodigo.current(),
      libroId,
      usuarioId: usuario.id,
      fechaPrestamo,
      fechaDevolucion,
      estado: 'activo'
    };
    setPrestamos([...prestamos, nuevo]);
    setLibros(libros.map((l) => (l.id === libroId ? { ...l, disponible: false } : l)));
  };

  return (
    <>
      <Navbar />
      <div className="container pb-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo libros={libros} />} />
          <Route path="/catalogo/:id" element={<DetalleLibro libros={libros} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mis-prestamos" element={<RutaProtegida><MisPrestamos libros={libros} prestamos={prestamos} /></RutaProtegida>} />
          <Route path="/nuevo-prestamo" element={<RutaProtegida><NuevoPrestamo libros={libros} prestamos={prestamos} onAgregarPrestamo={agregarPrestamo} /></RutaProtegida>} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRutas />
      </BrowserRouter>
    </AuthProvider>
  );
}
