/*
 * Objetivo del archivo:
 * Separar el contrato que llega del backend del modelo que usa la vista.
 *
 * Ejercicio para el estudiante:
 * 1. Comparar esta interfaz con la respuesta real de GET /api/categories.
 * 2. Agregar un nuevo campo al ViewModel si la pantalla necesita mostrarlo.
 * 3. Actualizar el mapper correspondiente en academic.mappers.ts.
 */
export interface CategoryApi {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export interface CategoryView {
  id: number;
  name: string;
  description: string;
  createdAtLabel: string;
}
