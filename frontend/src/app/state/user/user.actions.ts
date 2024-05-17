import { createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import { LoginRequest } from '../../shared/models/loginRequest.interface';
import { CurrentUser } from '../../shared/models/currentUser.interface';
// import { }

export const userActions = createActionGroup({
  source: 'user',
  events: {
    Login: props<{request: LoginRequest}>(),
    'Login success': props<{currentUser: CurrentUser}>(),
    'Login failure': emptyProps()
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
