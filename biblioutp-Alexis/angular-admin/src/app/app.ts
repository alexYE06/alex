import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark px-3 mb-4">
      <a class="navbar-brand" routerLink="/libros">BiblioUTP Admin</a>
      <div class="navbar-nav">
        <a class="nav-link" routerLink="/libros" routerLinkActive="active">Libros</a>
        <a class="nav-link" routerLink="/prestamos" routerLinkActive="active">Préstamos</a>
      </div>
    </nav>
    <div class="container">
      <router-outlet />
    </div>
  `
})
export class App {}
