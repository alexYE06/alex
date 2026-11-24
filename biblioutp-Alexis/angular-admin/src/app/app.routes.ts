import { Routes } from '@angular/router';
import { LibroListaComponent } from './components/libro-lista.component';
import { LibroFormComponent } from './components/libro-form.component';
import { PrestamoListaComponent } from './components/prestamo-lista.component';

export const routes: Routes = [
  { path: '', redirectTo: 'libros', pathMatch: 'full' },
  { path: 'libros', component: LibroListaComponent },
  { path: 'libros/nuevo', component: LibroFormComponent },
  { path: 'libros/:id/editar', component: LibroFormComponent },
  { path: 'prestamos', component: PrestamoListaComponent }
];
