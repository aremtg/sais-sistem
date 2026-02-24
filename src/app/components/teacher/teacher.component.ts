import { Component, OnInit } from '@angular/core';
import { TecaherService } from './service/tecaher.service';
import { DialogModule } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RegisterteacherComponent } from './registerteacher/registerteacher.component';
import { EstudentsService } from '../student/service/estudiantes.service';
import { Curso } from '../student/interface/sutdents.interface';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [ DialogModule  , MatButtonModule , ReactiveFormsModule , CommonModule , MatTooltipModule , MatIconModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.scss'
})
export class TeacherComponent implements OnInit {
  cursos: Curso[] = [];
  cursoseleccionado : string = '';

  constructor(
    private teacherService: TecaherService ,
    private snackbar: MatSnackBar ,
    private dialog : MatDialog ,
    private servicestudent : EstudentsService
  ) { }
  ngOnInit(): void {
    this.servicestudent.listadocursos().subscribe( data => {
      this.cursos = data.cursos;
    });

  }


register(){
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
