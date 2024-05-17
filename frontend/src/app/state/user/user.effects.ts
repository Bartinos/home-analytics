import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../shared/services/auth.service";
import { userActions } from "./user.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { CurrentUser } from "../../shared/models/currentUser.interface";


export const loginEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService)
)  => {
      return actions$.pipe(
      ofType(userActions.login),
      switchMap(({request}) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUser) => {
            return userActions.loginSuccess({currentUser})
          }),
          catchError(() => {
            return of(userActions.loginFailure())
          })
        )
      })
    )
    }, {
    functional: true
  }
)

