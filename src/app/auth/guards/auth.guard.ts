// import { CanActivateFn} from '@angular/router';
// import { Router } from '@angular/router';
// import { AuthService } from '../service/authService.service';
// import { inject } from '@angular/core';

// export const authorizationGuard: CanActivateFn = (route) => {
//   const auth = inject(AuthService);
//   const router = inject(Router);

//   // 1. No autenticado → login
//   if (!auth.isloogerdIn()) {
//     router.navigate(['/auth/login']);
//     return false;
//   }

//   // 2. Validación de roles (decorador de ruta)
//   const allowedRoles = route.data?.['roles'] as string[] | undefined;

//   if (allowedRoles && !allowedRoles.includes(auth.getUserRole())) {
//     // 3. Ruta existe pero NO estás autorizado → 404
//     router.navigate(['/404']);
//     return false;
//   }

//   return true;
// };
