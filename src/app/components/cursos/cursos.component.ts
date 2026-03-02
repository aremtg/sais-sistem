import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegistrocursoComponent } from './registrocurso/registrocurso.component';
import { MatDialog } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [ MatTooltipModule , MatIconModule , ReactiveFormsModule , CommonModule , FormsModule , DialogModule , MatCardModule ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  constructor( private dialog : MatDialog){}

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
