import { Component, OnInit } from '@angular/core';
import { TecaherService } from './service/tecaher.service';
import { DialogModule } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RegisterteacherComponent } from './registerteacher/registerteacher.component';
import { EstudentsService } from '../student/service/estudiantes.service';
import { Curso } from '../student/interface/sutdents.interface';
import { TablasFiltroProfesores, Teacher } from './interface/teacher.interface';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [DialogModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatTooltipModule, MatIconModule, FormsModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.scss'
})
export class TeacherComponent implements OnInit {
  cursos: Curso[] = [];
  cursoseleccionado: string = '';
  profesor: Teacher[] = [];
  filtros: string = '';
  page: number = 1;
  limit: number = 10;
  total: number = 0;
  totalPages: number = 0;
  startItem: number = 0;
  endItem: number = 0;


  constructor(
    private teacherService: TecaherService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private servicestudent: EstudentsService
  ) { }
  ngOnInit(): void {
    this.buscarprofesores();
    this.servicestudent.listadocursos().subscribe(data => {
      this.cursos = data.cursos;
    });

  }
  buscarprofesores() {
    let filtro: TablasFiltroProfesores = {
      nombre: '',
      cedula: '',
      curso_id: '',
      page: this.page,
      limit: this.limit
    };

    if (this.filtros && this.filtros.trim() !== '') {
      filtro.nombre = this.filtros.trim().toLowerCase();
      const terminoBusqueda = this.filtros.trim().toLowerCase();
      if (/^\d+$/.test(terminoBusqueda)) {
        filtro.cedula = terminoBusqueda;
        filtro.nombre = '';
      } else {
        filtro.nombre = terminoBusqueda;
        filtro.cedula = '';
      }
    }
    if (this.cursoseleccionado && this.cursoseleccionado.trim() !== '') {
      filtro.curso_id = this.cursoseleccionado;
    }
    this.teacherService.getTeachers(filtro).pipe(
      catchError(error => {
        this.snackbar.open(error.message, 'Cerrar', {
          duration: 3000,
        });
        return of({ message: '', teachers: [], total: 0, limit: 10, page: 1 });
      })
    ).subscribe(data => {
      this.profesor = data.teachers;
      this.total = data.total;
      this.limit = data.limit;
      this.page = data.page;
      this.totalPages = Math.ceil(this.total / this.limit);
      this.startItem = (this.page - 1) * this.limit + 1;
      this.endItem = Math.min(this.startItem + this.limit - 1, this.total);
    });
  }
  irAPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPages) return;

    this.page = pagina;
    this.buscarprofesores();
  }
  cambiarLimit(event: any) {
    this.limit = Number(event.target.value);
    this.page = 1;
    this.buscarprofesores();
  }

  // limpiar toda la data de los filtros
  filtrosLimpiar() {
    this.filtros = '';
    this.cursoseleccionado = '';
    this.buscarprofesores();
  }


  register() {
    const dialogRef = this.dialog.open(RegisterteacherComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.open(result.message, 'Cerrar', {
          duration: 3000,
        });
      }
      // acciones de tabla
    });
  }

}
