import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isloogerdIn(): boolean {
    return  !! sessionStorage.getItem('token');
  }

  login() {
    sessionStorage.removeItem('token');
  }

}
