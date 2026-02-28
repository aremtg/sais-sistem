import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrocurso',
  standalone: true,
  imports: [ FormsModule , ReactiveFormsModule , CommonModule , DialogModule ],
  templateUrl: './registrocurso.component.html',
})
export class RegistrocursoComponent {

}
