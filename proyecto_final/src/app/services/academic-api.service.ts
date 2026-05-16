import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../core/constants/api.constants';
import {
  mapCategoryApiToView,
  mapProductApiToView,
  mapStudentApiToView,
  mapTaskApiToView,
} from '../mappers/academic.mappers';
import { ApiResponse } from '../models/api-response.model';
import { CategoryApi, CategoryView } from '../models/category.model';
import { ProductApi, ProductView } from '../models/product.model';
import { CreateStudentPayload, StudentApi, StudentView } from '../models/student.model';
import { CreateTaskPayload, TaskApi, TaskView } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class AcademicApiService {
  /*
   * Objetivo del servicio:
   * Consumir el backend REST con HttpClient y devolver Observables tipados.
   *
   * Conceptos que evalua:
   * - inject() en lugar de constructor.
   * - Observable<T>.
   * - pipe(), map() y tap().
   * - Remapeo API -> ViewModel usando mappers.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Agregar tap() en getStudents() para observar la respuesta cruda.
   *
   * Actividad 2, nivel intermedio:
   * - Completar transformaciones marcadas como TODO en los mappers.
   *
   * Actividad 3, nivel intermedio:
   * - Implementar createTask() correctamente.
   *
   * Actividad 4, nivel reto:
   * - Crear createStudent() y getTaskById(id).
   *
   * Importante:
   * Este servicio esta intencionalmente incompleto en algunos puntos para que
   * el estudiante practique. No todo debe estar resuelto desde el inicio.
   *
   * Criterio de aceptacion:
   * - Ningun metodo debe devolver any.
   * - Todo endpoint debe usar ApiResponse<T>.
   * - Todo dato mostrado en HTML debe pasar por un ViewModel o mapper.
   */
  private readonly http = inject(HttpClient);

  getCategories(): Observable<CategoryView[]> {
    return this.http.get<ApiResponse<CategoryApi[]>>(`${API_BASE_URL}/categories`).pipe(
      tap((response) => console.log('Respuesta cruda categories:', response)),
      map((response) => response.data.map(mapCategoryApiToView)),
    );
  }

  getProducts(): Observable<ProductView[]> {
    return this.http.get<ApiResponse<ProductApi[]>>(`${API_BASE_URL}/products`).pipe(
      tap((response) => console.log('Respuesta cruda products:', response)),
      map((response) => response.data.map(mapProductApiToView)),
    );
  }

  getStudents(): Observable<StudentView[]> {
    return this.http.get<ApiResponse<StudentApi[]>>(`${API_BASE_URL}/students`).pipe(
      tap((response) => console.log('Respuesta cruda students:', response)),
      map((response) => response.data.map(mapStudentApiToView)),
    );
  }

  getTasks(): Observable<TaskView[]> {
    return this.http.get<ApiResponse<TaskApi[]>>(`${API_BASE_URL}/tasks`).pipe(
      tap((response) => console.log('Respuesta cruda tasks:', response)),
      map((response) => response.data.map(mapTaskApiToView)),
    );
  }

  createTask(payload: CreateTaskPayload): Observable<TaskView> {
    return this.http.post<ApiResponse<TaskApi>>(`${API_BASE_URL}/tasks`, payload).pipe(
      tap((response) => console.log('Respuesta createTask:', response)),
      map((response) => mapTaskApiToView(response.data)),
    );
  }

  createStudent(payload: CreateStudentPayload): Observable<StudentView> {
    return this.http.post<ApiResponse<StudentApi>>(`${API_BASE_URL}/students`, payload).pipe(
      tap((response) => console.log('Respuesta createStudent:', response)),
      map((response) => mapStudentApiToView(response.data)),
    );
  }

  getTaskById(id: number): Observable<TaskView> {
    return this.http.get<ApiResponse<TaskApi>>(`${API_BASE_URL}/tasks/${id}`).pipe(
      tap((response) => console.log('Respuesta task detail:', response)),
      map((response) => mapTaskApiToView(response.data)),
    );
  }
}
