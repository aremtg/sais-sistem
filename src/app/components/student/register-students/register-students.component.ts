import { Component, OnInit } from '@angular/core';
import { EstudentsService } from '../service/estudiantes.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogRef, MatDialogTitle, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curso } from '../interface/sutdents.interface';

@Component({
  selector: 'app-register-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DialogModule, MatDialogTitle, MatDialogClose, MatDialogContent],
  templateUrl: './register-students.component.html',
  styleUrl: './register-students.component.scss'
})
export class RegisterStudentsComponent implements OnInit {

  registerStudent : FormGroup;
  cursos : Curso[] = [];
  constructor( private readonly estudiantesService: EstudentsService ,
    private dialogRef : MatDialogRef<RegisterStudentsComponent> ,
    private fb : FormBuilder ,
    private  snackbar : MatSnackBar
   )
   {
    this.registerStudent = this.fb.group({
      cedula : ['' , Validators.required ],
      name   : ['', Validators.required ],
      lastname : ['', Validators.required],
      telefono : ['', Validators.required],
      email    : ['' , [Validators.required , Validators.email ]],
    });
  }
  ngOnInit(): void {
    // cargar los cursos disponibles
     this.estudiantesService.listadocursos().subscribe({
      next : ( resp ) => {
        this.cursos = resp.cursos;
      }
     });
  }
  cancelar(){
    this.registerStudent.reset();
    this.dialogRef.close();
  }
  guardar(){
    if (this.registerStudent.invalid) {
      this.snackbar.open('Por favor completa todos los campos', 'Cerrar', { duration: 2000 });
      return;
    }
    this.estudiantesService.registerStudents(this.registerStudent.value).subscribe({
      next : ( resp ) => {
        this.snackbar.open( resp.message , 'Cerrar' , {
          duration : 3000
        });
        this.dialogRef.close();
      },
      error : ( err ) => {
        this.snackbar.open( err.message , 'Cerrar' , {
          duration : 3000
        });
      }
    });
  }


}
