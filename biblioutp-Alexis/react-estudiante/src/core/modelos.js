export class Libro {
  constructor({ id, isbn, titulo, autor, categoria, anio, disponible }) {
    this.id = id;
    this.isbn = isbn;
    this.titulo = titulo;
    this.autor = autor;
    this.categoria = categoria;
    this.anio = anio;
    this.disponible = disponible;
  }

  get etiqueta() {
    return `${this.titulo} (${this.anio})`;
  }
}

export class Prestamo {
  constructor({ id, codigo, libroId, usuarioId, fechaPrestamo, fechaDevolucion, estado }) {
    this.id = id;
    this.codigo = codigo;
    this.libroId = libroId;
    this.usuarioId = usuarioId;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = fechaDevolucion;
    this.estado = estado;
  }

  get activo() {
    return this.estado === 'activo';
  }

  diasPrestamo() {
    const inicio = new Date(`${this.fechaPrestamo}T00:00:00`);
    const fin = new Date(`${this.fechaDevolucion}T00:00:00`);
    return Math.round((fin - inicio) / (1000 * 60 * 60 * 24));
  }

  estaVencido(hoy) {
    return this.activo && hoy > this.fechaDevolucion;
  }
}
