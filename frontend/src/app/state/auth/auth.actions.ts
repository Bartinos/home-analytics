import { createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import { LoginRequest } from '../../shared/models/loginRequest.interface';
import { CurrentUser } from '../../shared/models/currentUser.interface';
// import { }
import { BackendErrors } from '../../shared/models/backendErrors.interface';
export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Login: props<{request: LoginRequest}>(),
    'Login success': props<{currentUser: CurrentUser}>(),
    'Login failure': props<{errors: BackendErrors}>()
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
