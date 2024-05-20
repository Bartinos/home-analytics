import { createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import { LoginRequest } from '../../shared/models/login-request.interface';
import { CurrentUser } from '../../shared/models/current-user.interface';
export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Login: props<{request: LoginRequest}>(),
    'Login success': props<{currentUser: CurrentUser}>(),
    'Login failure': props<{errors: string[]}>(),
    'Logout': emptyProps(),
    'Logout success': emptyProps(),
    'Logout failure': props<{errors: string[]}>(),
    'Init user': props<{currentUser: CurrentUser}>()
  }
})
