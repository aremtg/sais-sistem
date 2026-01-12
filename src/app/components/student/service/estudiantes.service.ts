import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/api-local';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TablasEstudiantes, TablasFiltrosEstudiantes } from '../interface/sutdents.interface';
import { catchError } from 'rxjs';
import { CatchError } from '../../../shared/error/catchError';
const api = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class EstudentsService {

  constructor( private readonly http: HttpClient , private catcherror : CatchError ) { }

  getEstudents(filtros :  TablasFiltrosEstudiantes ) {
    let params =  new HttpParams();
    Object.entries(filtros).forEach(([key, values]) => {
      if (values && values.trim() && values !== undefined && values !== null && values !== ''
      ) {
        params = params.set(key, values.toString());
      }
    });
    return this.http.get<TablasEstudiantes>(`${api}students/tablas`, { params: params }).pipe(
      catchError(error => this.catcherror.handleError(error))
    )

  }
}
