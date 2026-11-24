import FormularioPrestamo from '../components/FormularioPrestamo';
import { useAuth } from '../context/AuthContext';
import { useTitulo } from '../hooks/useTitulo';

export default function NuevoPrestamo({ libros, prestamos, onAgregarPrestamo }) {
  useTitulo('Nuevo Préstamo');
  const { usuario } = useAuth();

  return (
    <div>
      <h2 className="mb-3">Solicitar Préstamo</h2>
      <FormularioPrestamo
        libros={libros}
        prestamos={prestamos}
        usuarioId={usuario.id}
        onAgregarPrestamo={onAgregarPrestamo}
      />
    </div>
  );
}
