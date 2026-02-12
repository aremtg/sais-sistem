import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Tablas, tablasfitros, Usuario } from '../../auth/interface/login.interface';
import { AuthService } from '../../auth/service/authService.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, count, of } from 'rxjs';
import { Roles } from './enum/rol.enum';
import { MatDialog } from '@angular/material/dialog';
import { RegistroUsersComponent } from './registro-users/registro-users.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatTooltipModule, CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  // usuarios: Usuario[] = [];
  total: number = 0;
  page: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  startItem: number = 0;
  endItem: number = 0;
  usuarios: Usuario[] = [];
  filtro: string = '';
  filtroRol: string = '';
  Active: string[] = ['ACTIVO', 'INACTIVO']
  role = Object.values(Roles)
  register!: FormGroup;
  Math: any;
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.buscar()
  }
  buscar() {
    const busqueda: tablasfitros = {
      email: '',
      cedula: '',
      role: '',
      page: this.page,
      limit: this.limit
    };
    if (this.filtro?.trim()) {
      const termino = this.filtro.trim().toLowerCase();
      termino.includes('@')
        ? busqueda.email = termino
        : busqueda.cedula = termino;
    }

    if (this.filtroRol?.trim()) {
      busqueda.role = this.filtroRol.toUpperCase();
    }
    this.authService.getfilter(busqueda).pipe(
      catchError(error => {
        this.snackbar.open(error.message, 'Cerrar', { duration: 3000 });
        return of({ message: 'no hay datos', usuarios: [], total: 0, page: 1, limit: 10 });
      }
    ))
      .subscribe((resp: Tablas) => {
        this.usuarios = resp.usuarios;
        this.total = resp.total;
        this.page = resp.page;
        this.limit = resp.limit;
        this.totalPages = Math.ceil(this.total / this.limit);
        this.startItem = (this.page - 1) * this.limit + 1;
        this.endItem = Math.min(this.page * this.limit, this.total);

      });
  }
  irAPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPages) return;

    this.page = pagina;
    this.buscar();
  }
  cambiarLimit(event: any) {
    this.limit = Number(event.target.value);
    this.page = 1;
    this.buscar();
  }
  //  filtros de busqueda
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
