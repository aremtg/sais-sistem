import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Student, TablasFiltrosEstudiantes } from './interface/sutdents.interface';
import { EstudentsService } from './service/estudiantes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-student',
  standalone: true,
  imports: [MatTooltipModule , MatSelectModule , ReactiveFormsModule  ,  CommonModule ,  MatFormFieldModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements  OnInit {

  estudiantes : Student[] = [];

  constructor( private estudiantesService : EstudentsService , snackbar : MatSnackBar) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
buscarEstudiantes(){
  let filtros : TablasFiltrosEstudiantes = {
    cedula : '' ,
    teacher_id : '' ,
    curso_id : ''
  };
  this.estudiantesService.getEstudents(filtros).subscribe({
    next: (response) => {
      this.estudiantes = response.students;
    },
    error: (error) => {
      console.error('Error al buscar estudiantes:', error);
    }
  });
}

}
