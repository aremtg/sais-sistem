import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Curso, EditStudents, Student, Students, TablasFiltrosEstudiantes, Teacher } from './interface/sutdents.interface';
import { EstudentsService } from './service/estudiantes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import {  MatDialog } from '@angular/material/dialog';
import { RegisterStudentsComponent } from './register-students/register-students.component';
import { VerComponent } from './ver/ver.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DialogRef } from '@angular/cdk/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-student',
  standalone: true,
  imports: [MatTooltipModule, MatSelectModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, FormsModule , MatIconModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit {

  estudiantes: Student[] = [];
  profesores : Teacher[] = [];
  profesorseleccionado : string = '';
  cursoseleccionado : string = '';
  cursos : Curso[] = [];
  filtros: string = '';

  constructor(private estudiantesService: EstudentsService, private snackbar: MatSnackBar,
    private dialog: MatDialog,

  ) { }
  ngOnInit(): void {
    this.buscarEstudiantes()
// cargar listado de profesores y cursos
    this.estudiantesService.listadoprofes().subscribe( data => {
      this.profesores = data.teachers;
    })
    this.estudiantesService.listadocursos().subscribe( data => {
      this.cursos = data.cursos;
    })
  }
  buscarEstudiantes() {
    let filtros: TablasFiltrosEstudiantes = {
      cedula: '',
      teacher_id: '',
      curso_id: ''
    };
    if (this.filtros && this.filtros.trim() !== '') {
      const terminolimpio = this.filtros.trim().toLowerCase();
      filtros.cedula = terminolimpio;
    }
    if (this.profesorseleccionado && this.profesorseleccionado.trim() !== '') {
      filtros.teacher_id = this.profesorseleccionado;
    }
    if (this.cursoseleccionado && this.cursoseleccionado.trim() !== '') {
      filtros.curso_id = this.cursoseleccionado;
    }

    this.estudiantesService.getEstudents(filtros)
      .pipe(
        catchError((error) => {
          this.snackbar.open(error.message, 'Cerrar', { duration: 2000 });
          return of({ count: 0, students: [] });
        })
      )
      .subscribe((data) => {
        this.estudiantes = data.students || [];
      });
  }
  // limpiar toda la data de los filtros
  filtrosLimpiar() {
    this.filtros = '';
    this.profesorseleccionado = '';
    this.cursoseleccionado = '';
    this.buscarEstudiantes();
  }
  register() {
    // Abrir un diálogo para registrar un nuevo estudiante
    const dialogRef = this.dialog.open(RegisterStudentsComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.open(result.message, 'Cerrar', { duration: 2000 });
      }
      this.buscarEstudiantes();
    });
  }

  ver( students :  Student ) {
    this.dialog.open( VerComponent , {
      data : students ,
      disableClose : true,
      width : '500px'
    });
  }

  edit( student: Students) {

    const DialogRef =  this.dialog.open(EditStudentComponent,{
      data : { ...student } ,
      disableClose : true,
    });
    DialogRef.afterClosed().subscribe( result => {
      if (result?.success) {
        this.snackbar.open(result.message , 'Cerrar',{ duration : 2000});
      }
      this.buscarEstudiantes();
    });

  }

  deleteData(students: Student) {

    const DialogRef = this.dialog.open(DeleteDialogComponent, {
      data: students,
      disableClose: true
    });
    DialogRef.afterClosed().subscribe(resp => {
      if (resp?.success) {
        this.snackbar.open(resp.message, 'Cerrar', { duration: 2000 });
      }
      this.buscarEstudiantes();
    });
  }


}
