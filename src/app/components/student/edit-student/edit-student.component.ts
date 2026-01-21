import { Component, Inject } from '@angular/core';
import { EstudentsService } from '../service/estudiantes.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../interface/sutdents.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [ ReactiveFormsModule , CommonModule , FormsModule],
templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss'
})
export class EditStudentComponent {

  edit! : FormGroup;
  constructor( private estudiantesService: EstudentsService ,
     private fb  : FormBuilder,
     @Inject(MAT_DIALOG_DATA) public data : Student,
     private snackbar  :MatSnackBar

   ) {
    this.edit = fb.group({
      cedula : [ data.cedula ] ,
      name   : [ data.name ] ,
      lastname : [ data.lastname ] ,
      telefono : [ data.telefono ] ,
      email    : [ data.email ] ,
    })
   }

   guardarCambios() {
    if (this.edit.invalid) {
      this.snackbar.open('Por favor, complete todos los campos correctamente.', 'Cerrar', { duration: 3000 });
      return;
    }
    const updatedStudent: Student = {
      ...this.data,
      ...this.edit.value
    }
    this.estudiantesService.updateStudent(this.data.id , updatedStudent).subscribe({
      next: (resp) => {
        this.snackbar.open('Estudiante actualizado con éxito.', 'Cerrar', { duration: 3000 });
        // this.dialogRef.close(true); // Cerrar el diálogo y pasar true para indicar éxito
      },
      error: (err) => {
        this.snackbar.open('Error al actualizar el estudiante. Inténtalo de nuevo.', 'Cerrar', { duration: 3000 });
      }
    });


   }

}
