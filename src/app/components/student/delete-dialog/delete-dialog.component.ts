import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [ ReactiveFormsModule , CommonModule , FormsModule , DialogModule],
  template : `
  

  `
})
export class DeleteDialogComponent {

  constructor(){}

}
