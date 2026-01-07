import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { AuthService } from '../service/authService.service';
import { Login } from '../interface/login.interface';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(AuthService);

  // Proteger el acceso a sessionStorage
  let token: string | null = null;
  if (typeof window !== 'undefined' && window.sessionStorage) {
    token = sessionStorage.getItem('token');
  }

  const authreq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  return next(authreq).pipe(
    catchError((error) => {
      if (error.status === 401 && error.error?.message === 'Token no válido') {
        let refreshToken: string | null = null;
        if (typeof window !== 'undefined' && window.sessionStorage) {
          refreshToken = sessionStorage.getItem('refreshToken');
        }
        if (!refreshToken) {
          if (typeof window !== 'undefined' && window.sessionStorage) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('nombrecompleto');
            sessionStorage.removeItem('refreshToken');
            sessionStorage.removeItem('usuario');
            sessionStorage.removeItem('imagen');
          }
          return of(error);
        }
        return loginService.refreshToken(refreshToken).pipe(
          switchMap((res: Login) => {
            if (typeof window !== 'undefined' && window.sessionStorage) {
              sessionStorage.setItem('token', res.token.token);
              sessionStorage.setItem('refreshToken', res.token.refreshToken);
            }
            const newreq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.token.token}`
              }
            });
            return next(newreq);
          }),
          catchError((refresherror) => {
            if (typeof window !== 'undefined' && window.sessionStorage) {
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('role');
              sessionStorage.removeItem('nombrecompleto');
              sessionStorage.removeItem('refreshToken');
              sessionStorage.removeItem('usuario');
              sessionStorage.removeItem('imagen');
            }
            throw refresherror;
          })
        );
      }
      throw error;
    })
  );
};
