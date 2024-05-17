import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../shared/services/auth.service";
import { authActions } from "./auth.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { CurrentUser } from "../../shared/models/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "../../shared/services/persistance.service";


export const loginEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistanceService = inject(PersistanceService)
)  => {
      return actions$.pipe(
      ofType(authActions.login),
      switchMap(({request}) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUser) => {
            persistanceService.set('accessToken', currentUser.accessToken);
            persistanceService.set('refreshToken', currentUser.refreshToken);
            return authActions.loginSuccess({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(authActions.loginFailure(errorResponse.error.errors))
          })
        )
      })
    )
    }, {
    functional: true
  }
);

