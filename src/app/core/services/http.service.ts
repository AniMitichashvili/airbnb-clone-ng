import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpService: any;

  constructor(private httpClient: HttpClient) { }

  public create() { }


  getLogInUserData(): any {
    try {
      const token = localStorage['token'] || '';
      if (token) {
        return jwtDecode(token);
      }
    } catch (ex) {
      return {};
    }
  }


  auth(authData: any): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const apiUrl = 'http://www.airbnb-digital-students.somee.com/api/User/LogIn';
    return this.httpClient.post(apiUrl, authData, { headers: headers });
  }


  register(registerData: any): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const apiUrl = 'http://www.airbnb-digital-students.somee.com/api/user/registerUser';
    return this.httpClient.post(apiUrl, registerData, { headers: headers });
  }

  updateUserInfo(data: any): Observable<any> {
    const token = localStorage['token'];
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('authorization', `bearer ${token}`);

    const apiUrl = 'http://www.airbnb-digital-students.somee.com/api/User/updateuserdata';
    const requestData = {
      id: data.id,
      userName: data.userName,
      email: data.email,
      newPassword: data.newPassword,
      phone: data.phone,
      personalNumber: data.personalNumber,
      gender: data.gender,
      surname: data.surname
    };

    return this.httpClient.put(apiUrl, requestData, { headers: headers });
  }

  public read(): Observable<any> {
    return this.httpClient.get('http://www.airbnb-digital-students.somee.com/getall');
  }

  public delete() {

  }
}
