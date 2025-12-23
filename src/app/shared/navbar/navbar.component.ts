import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router) {}
  isProfileOpen = false;

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }
logout() {
    // Lógica de cierre de sesión aquí
    this.router.navigate(['/login']);
    console.log('Cerrando sesión...');
  }
}
