import { createAction, props} from '@ngrx/store';
import { LoginRequest } from '../../models/loginRequest.interface';
export const loginUser = createAction(
  '[User] Login',
  props<{request: LoginRequest}>()
);
