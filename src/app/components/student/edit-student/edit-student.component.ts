import { Component, Inject } from '@angular/core';
import { EstudentsService } from '../service/estudiantes.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EditStudents, Student, Students } from '../interface/sutdents.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [ ReactiveFormsModule , CommonModule , FormsModule , MatDialogModule],
templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss'
})
export class EditStudentComponent {

  edit! : FormGroup;
  constructor( private estudiantesService: EstudentsService ,
     private fb  : FormBuilder,
     @Inject(MAT_DIALOG_DATA) public data : Students,
     private snackbar  :MatSnackBar,
     private dialogRef : MatDialogRef<EditStudentComponent>
   ) {
    this.edit = fb.group({
      cedula :   [data.cedula ] ,
      name   :   [data.name ] ,
      lastname : [data.lastname ] ,
      telefono : [data.telefono ] ,
      email    : [data.email ] ,
    })
   }
   guardarCambios() {
    if (this.edit.invalid) {
      this.snackbar.open('Por favor, complete todos los campos correctamente.', 'Cerrar', { duration: 3000 });
      return;
    }
    const updatedStudent: EditStudents  = {
     cedula: this.edit.value.cedula,
      name: this.edit.value.name,
      lastname: this.edit.value.lastname,
      telefono: this.edit.value.telefono,
      email: this.edit.value.email
    }
    this.estudiantesService.updateStudent(this.data.id, updatedStudent).subscribe({
      next: (resp) => {
        this.dialogRef.close(); // Cerrar el diálogo y pasar true para indicar éxito
        this.snackbar.open(resp.message, 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        this.snackbar.open(err.message, 'Cerrar', { duration: 3000 });
      }
    });


   }

}
