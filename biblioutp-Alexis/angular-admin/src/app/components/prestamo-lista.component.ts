import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamoApi } from '../services/prestamo-api.service';
import { Prestamo } from '../models/biblioteca.model';
import { EstadoPrestamoPipe } from '../pipes/estado-prestamo.pipe';

@Component({
  selector: 'app-prestamo-lista',
  standalone: true,
  imports: [CommonModule, EstadoPrestamoPipe],
  template: `
    <h2>Lista de Préstamos</h2>
    <table class="table table-bordered table-hover mt-3">
      <thead class="table-dark">
        <tr>
          <th>Código</th>
          <th>ID Libro</th>
          <th>ID Usuario</th>
          <th>Fecha Préstamo</th>
          <th>Fecha Devolución</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        @for (p of prestamos(); track p.id) {
          <tr>
            <td>{{ p.codigo }}</td>
            <td>{{ p.libroId }}</td>
            <td>{{ p.usuarioId }}</td>
            <td>{{ p.fechaPrestamo }}</td>
            <td>{{ p.fechaDevolucion }}</td>
            <td>{{ p.estado | estadoPrestamo }}</td>
          </tr>
        } @empty {
          <tr>
            <td colspan="6" class="text-center">No hay préstamos registrados.</td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class PrestamoListaComponent implements OnInit {
  private prestamoApi = inject(PrestamoApi);
  prestamos = signal<Prestamo[]>([]);

  ngOnInit(): void {
    this.prestamoApi.listar().subscribe((data) => this.prestamos.set(data));
  }
}
