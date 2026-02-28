import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrocurso',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, DialogModule],
  templateUrl: './registrocurso.component.html',
})
export class RegistrocursoComponent {
  regiscurso: FormGroup;


  constructor(private fb: FormBuilder, private snackbar: MatSnackBar, private dialog: MatDialogRef<RegistrocursoComponent>
  ) {
    this.regiscurso = this.fb.group({
      nombreCurso: ['', Validators.required],
      descripcion: ['', Validators.required],
      codigo: ['', Validators.required],
      teacher_id: ['', Validators.required]
    })
  }

  cancelar() {
    this.regiscurso.reset(),
      this.dialog.close()
  }
}
