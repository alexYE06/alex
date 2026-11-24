import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibroApi } from '../services/libro-api.service';
import { Libro } from '../models/biblioteca.model';

@Component({
  selector: 'app-libro-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Catálogo de Libros</h2>
      <a routerLink="/libros/nuevo" class="btn btn-primary">+ Nuevo Libro</a>
    </div>

    <div class="row mb-3">
      <div class="col-md-4">
        <select class="form-select" (change)="filtrarCategoria($event)">
          <option value="">Todas las categorías</option>
          <option value="Literatura">Literatura</option>
          <option value="Programación">Programación</option>
          <option value="Ciencia">Ciencia</option>
        </select>
      </div>
    </div>

    @if (cargando()) {
      <div class="alert alert-info">Cargando...</div>
    } @else if (error()) {
      <div class="alert alert-danger">{{ error() }}</div>
    } @else {
      <table class="table table-striped table-bordered align-middle">
        <thead class="table-dark">
          <tr>
            <th>ISBN</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Categoría</th>
            <th>Año</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (libro of libros(); track libro.id) {
            <tr>
              <td>{{ libro.isbn }}</td>
              <td>{{ libro.titulo }}</td>
              <td>{{ libro.autor }}</td>
              <td>{{ libro.categoria }}</td>
              <td>{{ libro.anio }}</td>
              <td>
                <span class="badge" [ngClass]="libro.disponible ? 'bg-success' : 'bg-secondary'">
                  {{ libro.disponible ? 'Disponible' : 'Prestado' }}
                </span>
              </td>
              <td>
                <a [routerLink]="['/libros', libro.id, 'editar']" class="btn btn-sm btn-warning me-2">Editar</a>
                <button (click)="eliminar(libro.id)" class="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="7" class="text-center text-muted">No hay libros registrados.</td>
            </tr>
          }
        </tbody>
      </table>
    }
  `
})
export class LibroListaComponent implements OnInit {
  private libroApi = inject(LibroApi);
  libros = signal<Libro[]>([]);
  cargando = signal<boolean>(false);
  error = signal<string>('');
  categoriaSeleccionada = signal<string>('');

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.cargando.set(true);
    this.error.set('');
    this.libroApi.listar(this.categoriaSeleccionada()).subscribe({
      next: (data) => {
        this.libros.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los libros del servidor.');
        this.cargando.set(false);
      }
    });
  }

  filtrarCategoria(event: Event): void {
    const valor = (event.target as HTMLSelectElement).value;
    this.categoriaSeleccionada.set(valor);
    this.cargarLibros();
  }

  eliminar(id: number): void {
    if (!confirm('¿Deseas eliminar este libro?')) return;
    this.libroApi.eliminar(id).subscribe({
      next: () => this.cargarLibros(),
      error: () => this.error.set('No se pudo eliminar el libro.')
    });
  }
}
