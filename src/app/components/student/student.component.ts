import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Student } from './interface/sutdents.interface';
@Component({
  selector: 'app-student',
  standalone: true,
  imports: [MatTooltipModule , MatSelectModule , ReactiveFormsModule  ,  CommonModule ,  MatFormFieldModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {

  estudiantes : Student[] = [];

  constructor() { }


}
