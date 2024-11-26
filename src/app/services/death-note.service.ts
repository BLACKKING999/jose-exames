<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Character {
=======
// /services/death-note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DeathNoteCharacter {
>>>>>>> 5007b7c941b1f86d7773da2c742958628ded106e
  _id: string;
  name: string;
  alias: string;
  description: string;
  deathNoteOwner: boolean;
  shinigami: boolean;
  intelligence: number;
  image: string;
  abilities: string[];
  status: string;
  relationships: any[];
}

<<<<<<< HEAD
export interface ApiResponse {
  success: boolean;
  count?: number; // count es opcional en algunas respuestas
  data: Character[] | Character; // Puede ser un array o un solo objeto
}

=======
>>>>>>> 5007b7c941b1f86d7773da2c742958628ded106e
@Injectable({
  providedIn: 'root'
})
export class DeathNoteService {
<<<<<<< HEAD
  private apiUrl = 'https://death-note-api-1.onrender.com/api/characters';

  constructor(private http: HttpClient) {}

  // Obtener todos los personajes
  getCharacters(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl)
      .pipe(
        catchError(this.handleError<ApiResponse>('getCharacters'))
      );
  }

  // Buscar personajes por nombre
  searchCharacters(name: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/name/${encodeURIComponent(name)}`; // Cambié a /name/ para que coincida con tu API
    return this.http.get<ApiResponse>(url)
      .pipe(
        catchError(this.handleError<ApiResponse>('searchCharacters'))
      );
  }

  // Crear un nuevo personaje
  createCharacter(character: Character): Observable<ApiResponse> {
    // Eliminar _id si está vacío
    const { _id, ...characterData } = character;
  
    // Asegurar arrays definidos
    const safeCharacter = {
      ...characterData,
      abilities: character.abilities || [],
      relationships: character.relationships || [],
      intelligence: Math.min(Math.max(character.intelligence, 1), 10)
    };
  
    console.log('Datos enviados al crear:', safeCharacter);
  
    return this.http.post<ApiResponse>(this.apiUrl, safeCharacter)
      .pipe(
        catchError(this.handleError<ApiResponse>('createCharacter'))
      );
  }

  // Actualizar un personaje existente
  updateCharacter(id: string, character: Character): Observable<ApiResponse> {
    console.log('Datos enviados:', character); // Log de datos antes del envío

    const url = `${this.apiUrl}/${id}`;
    return this.http.put<ApiResponse>(url, character)
      .pipe(
        catchError(this.handleError<ApiResponse>('updateCharacter'))
      );
  }

  // Eliminar un personaje
  deleteCharacter(id: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse>(url)
      .pipe(
        catchError(this.handleError<ApiResponse>('deleteCharacter'))
      );
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      // Aquí puedes agregar más lógica para manejar diferentes tipos de errores
      console.error(`${operation} failed:`, error); // Imprimir el error en la consola
      // Retornar un objeto vacío como respuesta
      return of({ success: false, data: [] } as unknown as T); // Retornar un objeto que indique el fallo
    };
=======
  private apiUrl = 'http://localhost:4000/api/characters';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<DeathNoteCharacter[]> {
    return this.http.get<DeathNoteCharacter[]>(this.apiUrl);
  }

  getCharacterById(id: string): Observable<DeathNoteCharacter> {
    return this.http.get<DeathNoteCharacter>(`${this.apiUrl}/${id}`);
  }

  createCharacter(character: DeathNoteCharacter): Observable<DeathNoteCharacter> {
    return this.http.post<DeathNoteCharacter>(this.apiUrl, character);
  }

  updateCharacter(id: string, character: DeathNoteCharacter): Observable<DeathNoteCharacter> {
    return this.http.put<DeathNoteCharacter>(`${this.apiUrl}/${id}`, character);
  }

  deleteCharacter(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
>>>>>>> 5007b7c941b1f86d7773da2c742958628ded106e
  }
}
