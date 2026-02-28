import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [ MatTooltipModule , MatIconModule , ReactiveFormsModule , CommonModule , FormsModule , DialogModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  constructor( private dialog : Dialog){}

  registrocursos(){}

}
