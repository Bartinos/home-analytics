import { createReducer, on } from "@ngrx/store"
import { loginUser } from "./user.actions"

export interface UserState {
  username: string,
  isSubmittingLogin: boolean,
  error: string,
  status: 'pending' | 'loading' | 'error' | 'success'
  // user: UserState;
}

export const initialUserState: UserState = {
  username: 'undefined',
  isSubmittingLogin: false,
  error: '',
  status: 'pending'
}

export const userReducer = createReducer(
  initialUserState,
  on(loginUser, (state) => ({
    ...state,
    isSubmittingLogin: true,
    status: 'loading' as const
  }))
)
