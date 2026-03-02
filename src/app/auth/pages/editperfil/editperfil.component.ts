import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Perfil, Usuario } from '../../interface/login.interface';

@Component({
  selector: 'app-editperfil',
  standalone: true,
  imports: [ ReactiveFormsModule ,  CommonModule , FormsModule , MatDialogModule],
  templateUrl: './editperfil.component.html',
})
export class EditperfilComponent {
  edit :  FormGroup;
  constructor(private fb : FormBuilder , private dialogRef : MatDialogRef<EditperfilComponent> ,
    @Inject(MAT_DIALOG_DATA) public data : Perfil,
  ){
    this.edit = fb.group({
      nombre  : [data.nombre],
      apellido  : [data.apellido],
      cedula  : [data.cedula],
      email  : [data.cedula],
      isActive  : [data.isActive],
      role  : [data.role],
    })
  }
  guardarCambios(){}
}
