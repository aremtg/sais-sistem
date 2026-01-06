import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/api-local';
import { catchError, Observable, throwError } from 'rxjs';
import { Login, Tablas, tablasfitros } from '../interface/login.interface';
import { __values } from 'tslib';


const api = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(cedula: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${api}auth/login`, { cedula, password }).pipe(
      // capturamos errores
      catchError(this.handleError)
    );
  }
  getfilter(filtros: tablasfitros) {
    let params = new HttpParams();
    Object.entries(filtros).forEach(([key, values]) => {
      if (values && values.trim() && values !== undefined && values !== null && values !== ''
      ) {
        params = params.set(key, values.toString());
      }
    });
    return this.http.get<Tablas>(`${api}auth/filter`, { params : params }).pipe(
      catchError(this.handleError)
    )
  }
  // manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.status === 401) {
      errorMessage = 'No está autorizado para realizar esta acción';
    } else if (error.status === 400) {
      errorMessage = error.error?.message || 'Solicitud incorrecta, revise los datos enviados';
    } else if (error.status === 409) {
      errorMessage = error.error?.message || 'Conflicto: El recurso ya existe';
    } else if (error.status === 500) {
      errorMessage = 'Error interno del servidor, intente más tarde';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }


}
