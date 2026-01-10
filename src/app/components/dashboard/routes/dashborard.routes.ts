import { Routes } from '@angular/router';

export const Dashboard: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../dashboard.component').then((m) => m.DashboardComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../../home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('../../student/student.component').then(
            (m) => m.StudentComponent
          ),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('../../cursos/cursos.component').then(
            (m) => m.CursosComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../../usuarios/usuarios.component').then(
            (m) => m.UsuariosComponent
          ),
      },
      {
        path: 'Auth/ver-perfil',
        loadComponent: () =>
          import('../../../auth/pages/perfil-usuario/perfil-usuario.component').then(
            (m) => m.PerfilUsuarioComponent),
      },
      // rutas del modulo de home de asistencias
      {
        path: 'assitencias',
        loadComponent: () =>
          import('../../asistencia/asistencia.component').then(
            (m) => m.AsistenciaComponent
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

export default Dashboard;
