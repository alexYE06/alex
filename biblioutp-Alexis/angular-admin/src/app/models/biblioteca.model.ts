export interface Libro {
  id: number;
  isbn: string;
  titulo: string;
  autor: string;
  categoria: string;
  anio: number;
  disponible: boolean;
}

export type NuevoLibro = Omit<Libro, 'id'>;

export type EstadoPrestamo = 'activo' | 'devuelto';

export interface Prestamo {
  id: number;
  codigo: string;
  libroId: number;
  usuarioId: number;
  fechaPrestamo: string;
  fechaDevolucion: string;
  estado: EstadoPrestamo;
}
