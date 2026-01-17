import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from '../interface/sutdents.interface';

@Component({
  selector: 'app-ver',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, DialogModule, MatDialogTitle, MatDialogActions, MatDialogClose],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})
export class VerComponent {



  constructor( private snackbar: MatSnackBar ,
    // private dialogRef : DialogRef<VerComponent>,
    @Inject(MAT_DIALOG_DATA) public data : Student ,
    private fb : FormBuilder,

  )
  {

  }
   tieneCursos(): boolean {
    return this.data.cursos &&
           Array.isArray(this.data.cursos) &&
           this.data.cursos.length > 0;
  }

  tieneProfesor(): boolean {
    return this.data.teacher_id !== null;
  }


}
