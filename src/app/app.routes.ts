import { Routes } from '@angular/router';

export const routes: Routes = [
{
  path: '',
  loadChildren: () => import('./auth/routes/auth.routes').then(m => m.AuthRoutes)
},
{
  path:'**',
  redirectTo: 'Auth/not-found',
}
];
