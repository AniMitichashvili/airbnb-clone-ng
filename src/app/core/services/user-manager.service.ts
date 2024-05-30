import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor() { }

  saveUserToken(token: string) {
    localStorage['token'] = token;
  }

  getUserToken(): string {
    return localStorage['token'];
  }

  checkUserToken(): boolean {
    if (this.getUserToken() != undefined && this.getUserToken().length > 0) {
      return true;
    }
    return false;
  }
}