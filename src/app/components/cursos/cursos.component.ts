import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegistrocursoComponent } from './registrocurso/registrocurso.component';
import { MatDialog } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { CursoService } from './service/curso.service';
import { filtrosCursos, Teacher } from './interface/curso.interface';
@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [ MatTooltipModule , MatIconModule , ReactiveFormsModule , CommonModule , FormsModule , DialogModule , MatCardModule ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit {
  listaprofesores : Teacher[] = [];
  selectionTeacher = '';
  page : number = 1;
  limit: number = 10;
  constructor( private dialog : MatDialog , private serviceCursos : CursoService){ }
  ngOnInit(): void {
    this.serviceCursos.getTeacher().subscribe(
      data => {
        this.listaprofesores = data.teacher;
      }
    )
  }
  busquedaActiva(){
    let filtros : filtrosCursos = {
      nombreCurso : '',
      codigo : 0,
      page : this.page,
      limit : this.limit
    }
  }

  registrocursos(){
   const DialogRef = this.dialog.open( RegistrocursoComponent ,{
      disableClose :  true
    })
  }
   cursos = [
    { titulo: 'Angular Avanzado', descripcion: 'Arquitectura y Reactive Forms' },
    { titulo: 'NestJS Backend', descripcion: 'APIs REST profesionales' },
    { titulo: 'PostgreSQL', descripcion: 'Diseño y optimización de bases de datos' }
  ];

}
