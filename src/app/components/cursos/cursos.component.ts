import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegistrocursoComponent } from './registrocurso/registrocurso.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CursoService } from './service/curso.service';
import { Curso, filtrosCursos, Teacher } from './interface/curso.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [MatTooltipModule, MatIconModule, ReactiveFormsModule, CommonModule, FormsModule, DialogModule, MatCardModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  listaprofesores: Teacher[] = [];
  selectionTeacher: string = '';
  filtrosbuscar: string = '';

  pages: number = 1;
  limit: number = 10;
  total: number = 0;
  totalPages: number = 0;
  startItem: number = 0;
  endItem: number = 0;
  constructor(private dialog: MatDialog, private serviceCursos: CursoService, private snackbar: MatSnackBar) { }
  ngOnInit(): void {
    this.busquedaActiva()
    this.serviceCursos.getTeacher().subscribe(
      data => {
        this.listaprofesores = data.teacher;
      }
    )
  }
  busquedaActiva() {
    let filtros: filtrosCursos = {
      nombreCurso: '',
      codigo: '',
      teacher_id: '',
      pages: this.pages,
      limit: this.limit
    };
      if (this.filtrosbuscar && this.filtrosbuscar.trim() !== '') {
      filtros.nombreCurso = this.filtrosbuscar.trim().toLowerCase();
      const terminoBusqueda = this.filtrosbuscar.trim().toLowerCase();
      if (/^\d+$/.test(terminoBusqueda)) {
        filtros.codigo = terminoBusqueda;
        filtros.nombreCurso = '';
      } else {
        filtros.nombreCurso = terminoBusqueda;
        filtros.codigo = '';
      }
    }
    if (this.selectionTeacher && this.selectionTeacher.trim() !== '') {
      filtros.teacher_id = this.selectionTeacher;
    }
    this.serviceCursos.getListadoCursos(filtros).pipe(

      catchError((error) => {
        this.snackbar.open(error.message, 'Cerrar', { duration: 2000 });
        return of({ message: 'no hay datos', cursos: [], total: 0, pages: 1, limit: 10 });
      })
    ).subscribe((data) => {
      this.cursos = data.cursos,
        this.total = data.total,
        this.pages = data.pages,
        this.limit = data.limit,
        this.totalPages = Math.ceil(this.total / this.limit);
      this.startItem = (this.pages - 1) * this.limit + 1;
      this.endItem = Math.min(this.pages * this.limit, this.total);
    })
  }
  irAPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPages) return;

    this.pages = pagina;
    this.busquedaActiva();
  }
  cambiarLimit(event: any) {
    this.limit = Number(event.target.value);
    this.pages = 1;
    this.busquedaActiva();
  }

  registrocursos() {
    const DialogRef = this.dialog.open(RegistrocursoComponent, {
      disableClose: true
    });
    DialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.open(result.message, 'Cerrar', { duration : 2000});
      }
      this.busquedaActiva();
    })
  }
  limpiarfiltros(){
    this.filtrosbuscar = '';
    this.selectionTeacher = '';
    this.busquedaActiva();
  }

}
