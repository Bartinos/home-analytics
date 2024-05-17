import { createReducer, on } from "@ngrx/store"
import {  authActions } from "./auth.actions"
import { CurrentUser } from "../../shared/models/currentUser.interface"
import { BackendErrors } from "../../shared/models/backendErrors.interface"

export interface AuthState {
  currentUser: CurrentUser | null | undefined,
  isSubmittingLogin: boolean,
  // error: string,
  // status: 'pending' | 'loading' | 'error' | 'success'
  isLoading: boolean,
  validationErrors: BackendErrors | null
  // user: UserState;
}

export const initialAuthState: AuthState = {
  currentUser: undefined,
  isSubmittingLogin: false,
  // error: '',
  // status: 'pending'
  isLoading: false,
  validationErrors: null
}

export const authReducer = createReducer(
  initialAuthState,
  on(authActions.login, (state) => ({
    ...state,
    isSubmittingLogin: true,
    // status: 'loading' as const
    validationErrors: null
  })),
  on(authActions.loginSuccess, (state, action) => ({
    ...state,
    isSubmittingLogin: false,
    user: action.currentUser,
    // status: 'success' as const
  })),
  on(authActions.loginFailure, (state, action) => ({
    ...state,
    isSubmittingLogin: false,
    validationErrors: action.errors
    // status: 'error' as const
  }))
)
