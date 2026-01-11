import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-registre-person',
  standalone: true,
  imports: [ CommonModule , ReactiveFormsModule, FormsModule , MatDialogModule , MatButtonModule],
  templateUrl: './registre-person.component.html',
  styleUrl: './registre-person.component.scss'
})
export class RegistrePersonComponent {
   registerfrom! : FormGroup
  constructor(registerfrom: FormBuilder) {
    this.registerfrom = registerfrom.group({
      cedula : ['' , Validators.required],
      objeto : [''],
    })

  }

}
