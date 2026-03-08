import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/api-local';
import { filtrosCursos, GetTeacher, RegistroCurso, TablasCurso } from '../interface/curso.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs';
import { CatchError } from './../../../shared/error/catchError';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  api = environment.apiUrl;

  constructor(private http: HttpClient, private catchError: CatchError) { }
  // registro de nuevos curso
  registrecurso(newcurso: RegistroCurso) {
    return this.http.post<RegistroCurso>(`${this.api}cursos/register`, newcurso).pipe(
      catchError(error => this.catchError.handleError(error))
    );
  }
  // listado de teachers
  getTeacher() : Observable<GetTeacher> {
    return this.http.get<GetTeacher>(`${this.api}cursos/teacher/all`).pipe(
      catchError(error => this.catchError.handleError(error))
    )
  }
  // tabolas de funcion busqueda
  getListadoCursos(filtros: filtrosCursos) {
    let params = new HttpParams();
    Object.entries(filtros).forEach(([key, values]) => {
      if (values === undefined && values === null) { return; }
      if (typeof values === 'string' && values.trim() && values !== '') {
        params = params.set(key, values.toString());
      }
      if (typeof values === 'number') {
        params = params.set(key, values.toString());
      }
    });
    return this.http.get<TablasCurso>(`${this.api}cursos/tablas` ,{ params : params}).pipe(catchError(error => this.catchError.handleError(error)));
  }


}
