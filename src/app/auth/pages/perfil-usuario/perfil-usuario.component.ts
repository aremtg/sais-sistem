import { Component, OnInit } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CommonModule} from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {CloudinaryModule} from '@cloudinary/ng';
import { AuthService } from '../../service/authService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfilUsers, Usuario, Perfil } from '../../interface/login.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [ MatTooltipModule , CommonModule ,
     ReactiveFormsModule , FormsModule ,
      CloudinaryModule , MatIconModule , DialogModule
    ],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.scss'
})
export class PerfilUsuarioComponent implements OnInit {

  edit : FormGroup;
  isedit : boolean = false;
  nombrecompleto = '';
  role = '';
  imagen = '';
  usuario = '';
  email = '';
  perfil!: Perfil;
  selectFile : File | null = null;
  usuarios: PerfilUsers | null = null;
  error :  string |null = null;
  constructor( private authlogin : AuthService ,
    private readonly snakbar : MatSnackBar ,
     private dialog : MatDialog , private fb : FormBuilder
  ){
    this.edit = this.fb.group({
      nombre  : [{value : '' , disabled : true } , Validators.required],
      apellido  : [{value : '' , disabled : true } , Validators.required],
      cedula  : [{value : '' , disabled : true } , Validators.required],
      email  : [{value : '' , disabled : true } , Validators.required],
    })
    this.authlogin.profile().subscribe({
      next : (data)=> {
       this.edit.patchValue({
        nombre : data.perfil.nombre,
        apellido : data.perfil.apellido,
        cedula : data.perfil.cedula,
        email : data.perfil.email
       })
        },
      error: (err) => {
        this.error = err.message;
        this.usuarios =  null;
      },
    })
  }

  ngOnInit(): void {
    const local =  window.sessionStorage || window.localStorage;
    const token = local.getItem('token');
    if (token) {
      this.nombrecompleto = local.getItem('nombrecompleto') || '';
      this.role = local.getItem('role') || '';
      this.imagen = local.getItem('imagen') || '';
      this.usuario = local.getItem('usuario') || '';
      this.email = local.getItem('email') || '';
    }

  }
onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  // Validaciones recomendadas
  if (!file.type.startsWith('image/')) {
    this.snakbar.open('Solo se permiten imágenes', 'Cerrar', { duration: 3000 });
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    this.snakbar.open('La imagen no debe superar 2MB', 'Cerrar', { duration: 3000 });
    return;
  }
  const userId = this.authlogin.userId();
  if (!userId) {
    this.snakbar.open('No se puede obtener el ID del usuario', 'Cerrar', { duration: 3000 });
    return;
  }
  this.authlogin.updateUserImage(userId, file).subscribe({
    next: (resp) => {
      sessionStorage.setItem('imagen', resp.imageUrl);
      this.imagen = resp.imageUrl + '?t=' + Date.now(); // evita caché
    },
    error: () => {
      this.snakbar.open('Error al actualizar la imagen', 'Cerrar', { duration: 3000 });
    }
  });
}

activarEdicion() {
  this.isedit = true;
  this.edit.enable();
}
guardarCambios(){
   if (this.edit.invalid) return;

  const datos = this.edit.getRawValue();
  console.log(datos);
  this.edit.disable();
  this.isedit = false;
}
}
