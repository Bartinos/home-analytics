import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../shared/services/auth.service";
import { authActions } from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CurrentUser } from "../../shared/models/current-user.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "../../shared/services/persistance.service";
import { Router } from "@angular/router";


export const loginEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistanceService = inject(PersistanceService)
) => {
  return actions$.pipe(
    ofType(authActions.login),
    switchMap(({ request }) => {
      return authService.login(request).pipe(
        map((currentUser: CurrentUser) => {
          // console.log(`Current user: ${currentUser.username}`)
          persistanceService.set('accessToken', currentUser.accessToken);
          persistanceService.set('refreshToken', currentUser.refreshToken);
          return authActions.loginSuccess({ currentUser });
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

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  { functional: true, dispatch: false }
)

export const logoutEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistanceService = inject(PersistanceService)
) => {
  return actions$.pipe(
    ofType(authActions.logout),
    switchMap(() => {
      return authService.logout().pipe(
        map(() => {
          persistanceService.clear();
          return authActions.logoutSuccess();
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(authActions.logoutFailure(errorResponse.error.errors))
        })
      )
    })
  )},
  {
    functional: true
  }
)


export const redirectAfterLogoutEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.logoutSuccess),
      tap(() => {
        router.navigateByUrl('/login')
      })
    )
  },
  { functional: true, dispatch: false }
)
