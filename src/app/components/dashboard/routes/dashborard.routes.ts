import { Routes } from "@angular/router";

export const Dashboard: Routes = [
  {
    path: '',
    loadComponent: () => import('../dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('../../home/home.component').then(m => m.HomeComponent)
      },{
        path: 'students',
        loadComponent: () => import('../../student/student.component').then(m => m.StudentComponent)
      },
      {
        path: 'courses',
        loadComponent: () => import('../../cursos/cursos.component').then(m => m.CursosComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('../../usuarios/usuarios.component').then(m => m.UsuariosComponent)
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
