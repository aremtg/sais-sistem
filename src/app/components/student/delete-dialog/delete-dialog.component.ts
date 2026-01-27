import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, DialogModule, MatDialogModule],
  template : `
    <div class="">
        <h2 class="" matDialogTitle >desea eliminar el estudiante</h2>
    </div>

  `
})
export class DeleteDialogComponent {

  constructor(){}

}
