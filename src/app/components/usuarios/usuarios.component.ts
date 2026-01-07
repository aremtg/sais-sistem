import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { tablasfitros, Usuario } from '../../auth/interface/login.interface';
import { AuthService } from '../../auth/service/authService.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { Roles } from './enum/rol.enum';
import { MatDialog } from '@angular/material/dialog';
import { RegistroUsersComponent } from './registro-users/registro-users.component';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatTooltipModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  filtro: string = '';
  filtroRol: string = '';
  Active :  string[] = ['ACTIVO' , 'INACTIVO']
  role = Object.values(Roles)
  register!: FormGroup;
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.buscar()
  }
  buscar() {
    let busqueda: tablasfitros = {
      email: '',
      cedula: '',
      role: '',
      
    };
    if (this.filtro && this.filtro.trim() !== '') {
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
    if (this.filtroRol && this.filtroRol.trim() !== '') {
      busqueda.role = this.filtroRol.toLocaleUpperCase();
    }
    this.authService.getfilter(busqueda)
      .pipe(
        catchError((error) => {
          this.snackbar.open(error.message, 'Cerrar', { duration: 1000 });
          return of({ usuarios: [] });
        })
      )
      .subscribe((resp) => {
        this.usuarios = resp.usuarios || [];
      }
      );

  }
  limpiarfiltros() {
    this.filtro = '';
    this.filtroRol = '';
    this.Active = [''];
    this.buscar()
    // this.cargrusuarios();
  }
  aplicarroles() {
    this.buscar();
  }
  registrar() {
    const dialogRef = this.dialog.open(RegistroUsersComponent, {
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.snackbar.open(resultado.message, 'Cerrar', { duration: 3000 });
      }
      this.buscar();
    })
  }
}
