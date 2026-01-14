import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Student, TablasEstudiantes, TablasFiltrosEstudiantes } from './interface/sutdents.interface';
import { EstudentsService } from './service/estudiantes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, count, of } from 'rxjs';
@Component({
  selector: 'app-student',
  standalone: true,
  imports: [MatTooltipModule , MatSelectModule , ReactiveFormsModule  ,  CommonModule ,  MatFormFieldModule , FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements  OnInit {

  estudiantes : Student[] = [];
  filtros : string = '';

  constructor( private estudiantesService : EstudentsService , private snackbar : MatSnackBar) { }
  ngOnInit(): void {
    this.buscarEstudiantes()
  }
buscarEstudiantes(){
  let filtros : TablasFiltrosEstudiantes = {
    cedula : '' ,
    teacher_id : '' ,
    curso_id : ''
  };
  if (this.filtros && this.filtros.trim() !== '') {
    const terminolimpio = this.filtros.trim().toLowerCase();
    filtros.cedula = terminolimpio;
  }
  this.estudiantesService.getEstudents(filtros)
  .pipe(
    catchError((error) => {
      this.snackbar.open(error.message, 'Cerrar', { duration: 1000 });
      return of({ count: 0 ,  students: [] });
    })
  )
  .subscribe((data) => {
    this.estudiantes = data.students || [];
  });
}
filtrosLimpiar(){
  this.filtros = '';
  this.buscarEstudiantes();
}
}
