import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { DeleteStudent, Eliminado } from '../interface/sutdents.interface';
import { EstudentsService } from '../service/estudiantes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, DialogModule, MatDialogModule],
  template : `
    <div class="bg-white rounded shadow-md poppins-medium p6 w-full max-w-4xl">
        <h2 class=" flex items-center mb-2" mat-dialog-title > desea eliminar el estudiante</h2>
          <div mat-dialog-content class="">
            <p><strong>Cédula:</strong> {{ data.cedula }}</p>
            <p><strong>Nombre:</strong> {{ data.name }}</p>
            <p><strong>Apellido:</strong> {{ data.lastname }}</p>
          </div>
        <div class=" flex justify-between space-x-4 font-medium p-2" mat-dialog-actions>
          <button type="submit" mat-dialog-close class="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-300 transition " >Cancelar</button>
          <button type="submit" (click)="guardarelimando()" class="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-300 transition " >
            Confirma la elimnacion
          </button>
        </div>
    </div>

  `
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef : MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : Eliminado,
    private serviceStudents : EstudentsService,
    private snackbar : MatSnackBar
  ){}

  guardarelimando(){
    this.serviceStudents.deletestudents(this.data.id).subscribe({
      next : (resp) => {
        this.dialogRef.close();
        this.snackbar.open(resp.message , 'Cerrar' , { duration : 3000});
      },
      error : (error) =>{
        this.snackbar.open(error.message , 'Cerrar' ,{duration : 3000})
      }
    })

  }

}
