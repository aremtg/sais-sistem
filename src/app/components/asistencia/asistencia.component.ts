import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrePersonComponent } from './registre-person/registre-person.component';


@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [CommonModule , RouterLink , FormsModule, ReactiveFormsModule],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss'
})
export class AsistenciaComponent {

  registre! : FormBuilder

  constructor( private snackbar : MatSnackBar , private dialog : MatDialog) {}

  open() {
    const dialogRef = this.dialog.open(
      RegistrePersonComponent,
      {
        disableClose: true,
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackbar.open('Asistencia registrada con exito', 'Cerrar', {
          duration: 2000,
        });
      }
    });
  }
}
