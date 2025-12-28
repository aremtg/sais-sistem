import { Routes } from "@angular/router";

export const AuthRoutes : Routes= [

  {
    path: 'Auth/login',
    loadComponent: () => import('../pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'Auth/not-found',
    loadComponent: () => import('../pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
  {
    path: 'Auth/ver-perfil',
    loadComponent : () => import('../pages/perfil-usuario/perfil-usuario.component').then(m => m.PerfilUsuarioComponent)
  },
  {
    path: '',
    redirectTo: 'Auth/login',
    pathMatch: 'full',
  }
];
export default AuthRoutes;
