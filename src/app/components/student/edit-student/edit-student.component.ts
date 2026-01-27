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
  template : `
  <div class="bg-white rounded shadow-md poppins-medium p-6 w-full max-w-4xl">
  <div mat-dialog-title class=" flex items-center text-center mb-2">
    <h2>Detalles del Estudiante</h2>
    <p class="text-sm md:text-base opacity-50 text-gray-400 mt-2"> ver la informacion de usuario</p>
  </div>
  <div class="bg-white poppins-medium p-6 w-full max-w-4xl">
    <!-- formulario para cewr la data registrada -->
    <form mat-dialog-content class="space-y-4" [formGroup]="edit" >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
        <div class="flex flex-col">
          <label class="block poppins-bold text-sm md:text-base  text-black mb-1">Cédula:</label>
          <input type="text" formControlName="cedula"
            class="mt-1 block w-full border-2 border-gray-200 rounded-md text-md shadow-md p-2 outline-none bg-gray-100">
        </div>
        <div class="flex flex-col">
          <label class="block poppins-bold text-sm text-black mb-1">Nombre:</label>
          <input type="text" formControlName="name"
            class="mt-1 block w-full border-2 border-gray-200 rounded-md text-md shadow-md p-2 outline-none bg-gray-100">
        </div>
        <div class="flex flex-col">
          <label class="block poppins-bold text-sm text-black mb-1">Apellido:</label>
          <input type="text"  formControlName="lastname"
            class="mt-1 block w-full border-2 border-gray-200 rounded-md text-md shadow-md p-2 outline-none bg-gray-100">
        </div>
        <div class="flex flex-col">
          <label class="block poppins-bold text-sm text-black mb-1">Teléfono:</label>
          <input type="text" formControlName="telefono"
            class="mt-1 block w-full border-2 border-gray-200 rounded-md text-md shadow-md p-2 outline-none bg-gray-100">
        </div>
        <div class="flex flex-col col-span-2  ">
          <label class="block poppins-bold text-sm text-black mb-1">Email:</label>
          <input type="email" formControlName="email"
            class="mt-1 block w-full border-2 border-gray-200 rounded-md text-md shadow-md p-2 outline-none bg-gray-100">
        </div>
      </div>
    </form>
  </div>
  <div mat-dialog-actions class=" flex justify-between space-x-4 font-medium p-2">
    <button mat-dialog-close
    class="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-300 transition ">
      Cancelar
    </button>
    <button type="submit" (click)="guardarCambios()"
    class="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-300 transition ">
      Guardar Cambios
    </button>
  </div>
  </div>
  `,
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
