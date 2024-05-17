import { Injectable, inject } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { AuthService } from '../services/auth.service';
import { Observable, throwError, BehaviorSubject, finalize } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { PersistanceService } from "../services/persistance.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private persistanceService: PersistanceService = inject(PersistanceService);
  private authService: AuthService = inject(AuthService);
  private accessTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.persistanceService.get('accessToken')?.toString()
    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          return this.handle403Error(request, next);
        } else {
          return throwError(() => error);
        }
      })
    ) as Observable<HttpEvent<any>>;
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.accessTokenSubject.next(null);

      return this.authService.refreshAccessToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.accessTokenSubject.next(token.accessToken);
          console.log("Finished refreshing accessToken");
          this.persistanceService.set('accessToken', token.accessToken);
          return next.handle(this.addToken(request, token.accessToken));
        })
      );
    } else {
      return this.accessTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((accessToken) => {
          return next.handle(this.addToken(request, accessToken));
        }))
    }
  }
}


export const tokenInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
};
