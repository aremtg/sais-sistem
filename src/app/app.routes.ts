import { Routes } from '@angular/router';

export const routes: Routes = [
{
  path: '',
  loadChildren: () => import('./auth/routes/auth.routes').then(m => m.AuthRoutes)
},
{
  path: 'sistema/dashboard',
  loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
},
{
  path: 'sistema/dashboard',
  loadChildren: () => import('./components/dashboard/routes/dashborard.routes').then(m => m.Dashboard)

},

{
  path:'**',
  redirectTo: 'Auth/not-found',
}
];
