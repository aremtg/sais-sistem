import { Component } from '@angular/core';
import { AuthService } from '../../service/authService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../../interface/login.interface';
import { Router } from '@angular/router';
import { FooterComponent } from "../../../shared/footer/footer.component";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, FooterComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  hidePassword : boolean = true;
  fromlogin! : FormGroup;
  constructor( private authService: AuthService ,
     private snackbar: MatSnackBar ,
     private fb :  FormBuilder ,
    private router: Router) {
    this.fromlogin = this.fb.group({
      cedula : ['' , [Validators.required]],
      password : ['' , [Validators.required]]
    });
   }

   login(){
    if (this.fromlogin.invalid) {
      this.snackbar.open('Por favor complete todos los campos', 'Close', { duration: 3000 });
      return;
    }
    const { cedula , password} = this.fromlogin.value;
    this.authService.login( cedula , password).subscribe({
      next: (resp :  Login) => {
        if (resp && resp.usuario && resp.token.token) {
          sessionStorage.setItem('token', resp.token.token);
          sessionStorage.setItem('role', resp.usuario.role);
          sessionStorage.setItem('usuario', resp.usuario.cedula);
          sessionStorage.setItem('refreshToken', resp.token.refreshToken);
          sessionStorage.setItem('imagen', resp.usuario.imagen ? resp.usuario.imagen : 'no hay imagen');
          sessionStorage.setItem(`nombrecompleto`,`${resp.usuario.nombre} ${resp.usuario.apellido}`);
          this.snackbar.open( resp.message, 'Close', { duration: 3000 });
          this.router.navigate(['sistema/dashboard']);
        }
      },
      error: (err) => {
        this.snackbar.open(err.message,'Close', { duration: 3000 });
      }
    });
   }
   Hidepasswords(){
    this.hidePassword = !this.hidePassword;
   }

}
