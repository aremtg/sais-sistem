import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { tablasfitros, Usuario } from '../../auth/interface/login.interface';
import { AuthService } from '../../auth/service/authService.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { Roles } from './enum/rol.enum';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ MatTooltipModule , CommonModule , ReactiveFormsModule , FormsModule],
templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{

  usuarios : Usuario[] = [];
  filtro : string = '';
  filtroRol : string = '';
  role = Object.values(Roles)
  constructor(private authService : AuthService , private snackbar : MatSnackBar){}
  ngOnInit(): void {
   this.buscar()
  }
  buscar(){
    let busqueda : tablasfitros = {
      email : '',
      cedula : '',
      role : '',
    };
    if (this.filtro && this.filtro.trim() !=='') {
      const terminolimpio = this.filtro.trim().toLowerCase();
      if (terminolimpio.includes('@')) {
        busqueda.email = terminolimpio;
      } else {
        busqueda.cedula = terminolimpio;
      }
    }
    if (this.filtroRol && this.filtroRol.trim() !== '') {
      busqueda.role = this.filtroRol.toLocaleUpperCase();
    }
    this.authService.getfilter(busqueda)
    .pipe(
      catchError((error) => {
        this.snackbar.open(error.message, 'Cerrar', {
          duration: 3000,
        });
        return of({ usuarios: []});

      })
    )
    .subscribe((resp) => {
      this.usuarios = resp.usuarios  || [];
    }
  )
  }
  limpiarfiltros(){
    this.filtro = '';
    this.filtroRol = '';
    this.buscar()
    // this.cargrusuarios();
  }
  aplicarroles(){
    this.buscar();
  }

}
