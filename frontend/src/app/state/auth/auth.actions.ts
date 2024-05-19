import { createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import { LoginRequest } from '../../shared/models/login-request.interface';
import { CurrentUser } from '../../shared/models/current-user.interface';
// import { }
import { BackendErrors } from '../../shared/models/backend-errors.interface';
export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Login: props<{request: LoginRequest}>(),
    'Login success': props<{currentUser: CurrentUser}>(),
    'Login failure': props<{errors: BackendErrors}>(),
    'Logout': emptyProps(),
    'Logout success': emptyProps(),
    'Logout failure': props<{errors: BackendErrors}>(),
    'Init user': props<{currentUser: CurrentUser}>()
  }
})

// export const loginUser = createAction(
//   '[User] Login',
//   props<{request: LoginRequest}>()
// );
//
// export const loginUserSuccess = createAction(
//   '[User] Succesfully logged in',
//   // emptyProps()
// )
