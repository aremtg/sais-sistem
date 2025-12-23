import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../shared/footer/footer.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuComponent, RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
