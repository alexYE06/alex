import { Pipe, PipeTransform } from '@angular/core';
import { EstadoPrestamo } from '../models/biblioteca.model';

@Pipe({
  name: 'estadoPrestamo',
  standalone: true
})
export class EstadoPrestamoPipe implements PipeTransform {
  transform(valor: EstadoPrestamo): string {
    return valor === 'activo' ? '📘 Activo' : '✅ Devuelto';
  }
}
