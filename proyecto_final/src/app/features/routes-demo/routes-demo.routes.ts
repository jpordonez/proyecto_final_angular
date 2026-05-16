import { Routes } from '@angular/router';

export const routesDemoRoutes: Routes = [
  /*
   * Objetivo del archivo:
   * Demostrar rutas hijas y ruta con parametro id.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Identificar cual es la ruta padre y cuales son rutas hijas.
   *
   * Actividad 2, nivel intermedio:
   * - Agregar una ruta hija nueva, por ejemplo "crear".
   *
   * Actividad 3, nivel reto:
   * - Crear una ruta "tasks/:id" que lea un id real y consulte el backend.
   *
   * Criterio de aceptacion:
   * - La nueva ruta debe cargarse con loadComponent.
   * - No debe importarse el componente directamente arriba si sera lazy loaded.
   */
  {
    path: '',
    loadComponent: () =>
      import('./routes-shell/routes-shell.page').then((m) => m.RoutesShellPage),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./route-list/route-list.page').then((m) => m.RouteListPage),
      },
      {
        path: 'crear',
        loadComponent: () =>
          import('./route-create/route-create.page').then((m) => m.RouteCreatePage),
      },
      {
        path: 'tasks/:id',
        loadComponent: () =>
          import('./route-detail/route-detail.page').then((m) => m.RouteDetailPage),
      },
      {
        path: ':id',
        redirectTo: 'tasks/:id',
      },
    ],
  },
];
