import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTeacher, TablasdeProfesores, TablasFiltroProfesores } from '../interface/teacher.interface';
import { environment } from '../../../../enviroments/api-local';
import { catchError, Observable } from 'rxjs';
import { CatchError } from './../../../shared/error/catchError';

@Injectable({
  providedIn: 'root'
})
export class TecaherService {
  api = environment.apiUrl;
  constructor( private http: HttpClient , private catchError: CatchError) { }

  createTeacher(create  :  CreateTeacher){
    return this.http.post<CreateTeacher>(`${this.api}teacher/register`, create).pipe(
      catchError(error => this.catchError.handleError(error))
    );
  }

  // lista de profesores
   getTeachers(filtros :  TablasFiltroProfesores ) : Observable<TablasdeProfesores> {
      let params =  new HttpParams();
     Object.entries(filtros).forEach(([key, values]) => {
        if (values === undefined && values === null) { return; }
        if (typeof values === 'string' && values.trim() && values !== '') {
          params = params.set(key, values.toString());
        }
        if (typeof values === 'number') {
          params = params.set(key, values.toString());
        }
      });
      return this.http.get<TablasdeProfesores>(`${this.api}teacher/tablas`, { params: params }).pipe(
        catchError(error => this.catchError.handleError(error))
      );
    }
}
