import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AcademicApiService } from '../../../services/academic-api.service';

interface LessonItem {
  id: number;
  title: string;
}

@Component({
  selector: 'app-route-list-page',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './route-list.page.html',
})
export class RouteListPage {
  /*
   * Objetivo del ejercicio:
   * Navegar hacia una ruta con parametro.
   *
   * Que debe completar el estudiante:
   * Reemplazar esta lista estatica por datos del backend.
   */
  private readonly api = inject(AcademicApiService);

  readonly lessons$: Observable<LessonItem[]> = this.api
    .getTasks()
    .pipe(map((tasks) => tasks.map((task) => ({ id: task.id, title: task.title }))));
}
