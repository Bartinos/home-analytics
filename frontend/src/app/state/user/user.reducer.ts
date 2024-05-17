import { createReducer, on } from "@ngrx/store"
import {  userActions } from "./user.actions"

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
  on(userActions.login, (state) => ({
    ...state,
    isSubmittingLogin: true,
    status: 'loading' as const
  })),
  on(userActions.loginSuccess, (state) => ({
    ...state,
    isSubmittingLogin: false,
    // username: currentUser.username,
    status: 'success' as const
  })),
  on(userActions.loginFailure, (state) => ({
    ...state,
    isSubmittingLogin: false,
    status: 'error' as const
  }))
)
