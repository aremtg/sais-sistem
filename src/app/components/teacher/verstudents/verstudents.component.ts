import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Teacher } from '../interface/teacher.interface';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-verstudents',
  standalone: true,
  imports: [ CommonModule , ReactiveFormsModule , FormsModule  , DialogModule ],
  templateUrl: './verstudents.component.html',
  styleUrl: './verstudents.component.scss'
})
export class VerstudentsComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public data: Teacher) { }


}
