import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: any): void {
    if (credentials.username === 'admin' && credentials.password === 'password') {
      localStorage.setItem('token', 'your_auth_token');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
