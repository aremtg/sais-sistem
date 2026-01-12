import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatchError {
   handleError(error: HttpErrorResponse) {
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
