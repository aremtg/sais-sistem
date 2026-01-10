import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterEvent, RouterLink } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss'
})
export class AsistenciaComponent {

}
