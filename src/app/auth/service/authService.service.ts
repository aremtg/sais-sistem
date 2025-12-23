import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/api-local';
import { catchError, Observable, throwError } from 'rxjs';
import { Login } from '../interface/login.interface';


const api = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

login( usuario :  string ,  password : string) :  Observable<Login>{
  return this.http.post<Login>(`${api}/auth/login`, { usuario, password }).pipe(
    // capturamos errores
    catchError(this.handleError)
  );
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

        return throwError(() => errorMessage);
    }


}
