import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Teacher } from '../interface/teacher.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vercursos',
  standalone: true,
  imports: [ ReactiveFormsModule , CommonModule , FormsModule  , MatDialogModule , ],
  templateUrl: './vercursos.component.html',
})
export class VercursosComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public data: Teacher) { }



}
