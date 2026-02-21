import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TecaherService } from '../service/tecaher.service';
import { MatDialogRef, MatDialogTitle, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registerteacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogActions, MatDialogContent],
  templateUrl: './registerteacher.component.html',
})
export class RegisterteacherComponent {
  registerTeacher : FormGroup;
  constructor( private tecaherService : TecaherService ,
    private dialog : MatDialogRef<RegisterteacherComponent> ,
    private fb : FormBuilder ,
    private  snackbar : MatSnackBar
  ) {
    this.registerTeacher = this.fb.group({
      cedula : ['' , Validators.required ],
      nombre : ['', Validators.required ],
      apellido : ['', Validators.required],
      profesion : ['', Validators.required],
      rama : ['', Validators.required],
      jornada : ['', Validators.required],
      email : ['' , [Validators.required , Validators.email ]],
      telefono : ['', Validators.required]
    });
   }
    cancelar(){
      this.registerTeacher.reset();
      this.dialog.close();
    }
    guardar(){
      if (this.registerTeacher.invalid) {
        this.snackbar.open('Por favor completa todos los campos', 'Cerrar', { duration: 2000 });
        return;
      }
      this.tecaherService.createTeacher(this.registerTeacher.value).subscribe({
        next: (response) => {
          this.snackbar.open(response.message, 'Cerrar', { duration: 2000 });
          this.dialog.close();
        },
        error: (error) => {
          this.snackbar.open(error.message, 'Cerrar', { duration: 2000 });
        }
      });
    }
}
