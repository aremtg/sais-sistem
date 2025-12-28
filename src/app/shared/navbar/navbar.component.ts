import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive , MatIconModule ],

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

   dropdowns: { [key: string]: boolean } = {
    usuarios: false,
    headersuser:false
    // puedes agregar más dropdowns aquí


  };

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.dropdowns['headerUser'] = false;
    }
  }
    toggleDropdown(key: string) {
    // Cerrar otros dropdowns
    Object.keys(this.dropdowns).forEach(k => {
      if (k !== key) this.dropdowns[k] = false;
    });
    // Toggle el dropdown actual
    this.dropdowns[key] = !this.dropdowns[key];
  }

}
