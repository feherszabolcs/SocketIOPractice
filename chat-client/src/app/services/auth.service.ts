import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials.model';
import { Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'http://localhost:3000/auth';

  user?: { username: string; token: string };

  constructor(private http: HttpClient) {
    this.saveUserInfo(localStorage.getItem('token')!);
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  login(credentials: Credentials): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.BASE_URL, credentials).pipe(
      map((response) => {
        this.saveUserInfo(response.token);
        localStorage.setItem('token', response.token);

        return response;
      })
    );
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('token');
  }

  private saveUserInfo(token?: string) {
    if (token)
      this.user = {
        username: jwtDecode<{ username: string }>(token).username,
        token: token,
      };
  }
}
