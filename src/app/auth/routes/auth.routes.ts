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
    path: '',
    redirectTo: 'Auth/login',
    pathMatch: 'full',
  }
];
export default AuthRoutes;
