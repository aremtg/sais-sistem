import { Routes } from "@angular/router";

export const Dashboard: Routes = [
  {
    path: '',
    loadComponent: () => import('../dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('../../home/home.component').then(m => m.HomeComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }

];

export default Dashboard;
