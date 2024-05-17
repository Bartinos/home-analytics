import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CurrentUser } from '../models/currentUser.interface';
import { AuthResponse } from '../models/authResponse.interface';
import { LoginRequest } from '../models/loginRequest.interface';
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
    // const refreshToken: string = this.storageService.getRefreshToken();
    const customHttpOptions = {
      headers: httpOptions.headers,
      body: {
        // token: refreshToken
      }
    };

    return this.http.delete(AUTH_API + 'logout', customHttpOptions);
  }

  refreshAccessToken(): Observable<any> {
    // const refreshToken: string = this.storageService.getRefreshToken();
    return this.http.post(AUTH_API + 'tokens', {
      // token: refreshToken
    },
      httpOptions);
  }
}
