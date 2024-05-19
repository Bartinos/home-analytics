import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CurrentUser } from '../models/current-user.interface';
import { AuthResponse } from '../models/auth-response.interface';
import { LoginRequest } from '../models/login-request.interface';
import { PersistanceService } from './persistance.service';
// import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:3000/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private http = inject(HttpClient);
  private persistanceService = inject(PersistanceService);
  // private storageService = inject(StorageService);

  login(loginRequest: LoginRequest): Observable<CurrentUser> {
    // console.log("Logging in...")
    return this.http.post<AuthResponse>(
      AUTH_API + 'login',
      loginRequest,
      httpOptions
    ).pipe(map(response => response.user))
  }

  logout(): Observable<any> {
    const refreshToken = this.persistanceService.get('refreshToken')?.toString();
    const customHttpOptions = {
      headers: httpOptions.headers,
      body: {
        token: refreshToken
      }
    };

    return this.http.delete(AUTH_API + 'logout', customHttpOptions);
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = this.persistanceService.get('refreshToken')?.toString();
    return this.http.post(AUTH_API + 'token', {
      token: refreshToken
    },
      httpOptions);
  }
}
