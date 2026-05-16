import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home.page.html',
})
export class HomePage {
  readonly studentName = 'Juan Pablo Ordoñez Lopez';
  readonly course = 'Curso Angular';
  readonly parallel = '1';

  readonly topics = [
    'Standalone components',
    'Zoneless change detection',
    'Rutas con lazy loading',
    'Servicios HTTP y Observables',
    'Formularios reactivos',
    'Local Storage',
  ];
}
