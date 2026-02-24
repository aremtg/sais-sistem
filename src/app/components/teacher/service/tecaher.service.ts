import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTeacher } from '../interface/teacher.interface';
import { environment } from '../../../../enviroments/api-local';
import { catchError } from 'rxjs';
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
}
