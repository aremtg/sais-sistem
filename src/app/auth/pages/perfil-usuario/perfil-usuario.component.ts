import { Component, OnInit } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CommonModule} from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CloudinaryModule} from '@cloudinary/ng';
import { Cloudinary , CloudinaryImage } from '@cloudinary/url-gen';
import { AuthService } from '../../service/authService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../interface/login.interface';
@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [ MatTooltipModule , CommonModule ,
     ReactiveFormsModule , FormsModule ,
      CloudinaryModule
    ],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.scss'
})
export class PerfilUsuarioComponent implements OnInit {

  nombrecompleto = '';
  role = '';
  imagen = '';
  usuario = '';
  selectFile : File | null = null;
  usuarios : Usuario[] = []
  constructor( private authlogin : AuthService ,
    private readonly snakbar : MatSnackBar ,
    private readonly fb : FormBuilder,
  ){}

  editdata(){}
  ngOnInit(): void {
    const local =  window.sessionStorage || window.localStorage;
    const token = local.getItem('token');
    if (token) {
      this.nombrecompleto = local.getItem('nombrecompleto') || '';
      this.role = local.getItem('role') || '';
      this.imagen = local.getItem('imagen') || '';
      this.usuario = local.getItem('usuario') || '';
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


}
