import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../auth/service/authService.service';


@Component({
  selector: 'app-registro-users',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule , CommonModule ,  MatDialogModule , MatButtonModule],
  templateUrl: './registro-users.component.html',
  styleUrl: './registro-users.component.scss'
})
export class RegistroUsersComponent {
  users : FormGroup;
  constructor(
    private fb : FormBuilder,
    private snackbar : MatSnackBar,
    private dialogRef : MatDialogRef<RegistroUsersComponent> ,
    private authlogin : AuthService
  ){
    this.users = this.fb.group({
      cedula  : '',
      nombre  : '',
      apellido: '',
      email   : '',
      imagen  : '',
      role    : '',
    })
  }
   cancelar() {
    this.users.reset();
    this.dialogRef.close();
  }
  guardar(){
    if (this.users.invalid) {
     this.snackbar.open('Por favor completa todos los campos', 'Cerrar', { duration: 2000 });
      return;
    }
    this.authlogin.registerUser(this.users.value).subscribe({
      next : (resp)=> {
        this.snackbar.open(resp.message , 'Cerrar' ,{
        duration : 3000
        });
        this.dialogRef.close();
      },
      error: (err) => {
        this.snackbar.open(err.message , 'Cerrar', { duration : 3000})
      }
    });
  }
}
