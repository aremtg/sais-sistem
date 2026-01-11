import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registre-person',
  standalone: true,
  imports: [ CommonModule , ReactiveFormsModule, FormsModule , MatDialogModule , MatButtonModule , MatIconModule],
  templateUrl: './registre-person.component.html',
  styleUrl: './registre-person.component.scss'
})
export class RegistrePersonComponent {
   registerfrom! : FormGroup;
   mostrardetallesobjeto = false;
  constructor(registerfrom: FormBuilder) {
    this.registerfrom = registerfrom.group({
      cedula : ['' , Validators.required],
      objeto : [''],
    })

  }
  mostarobsjeto(){
    this.mostrardetallesobjeto = true;
  }

}
