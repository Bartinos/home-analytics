import { createReducer, on } from "@ngrx/store"
import {  authActions } from "./auth.actions"
import { CurrentUser } from "../../shared/models/current-user.interface"
import { BackendErrors } from "../../shared/models/backend-errors.interface"

export interface AuthState {
  currentUser: CurrentUser | null | undefined,
  isSubmittingLogin: boolean,
  // error: string,
  // status: 'pending' | 'loading' | 'error' | 'success'
  isLoading: boolean,
  validationErrors: string[] | null
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
    currentUser: action.currentUser
  })),
  on(authActions.loginFailure, (state, action) => ({
    ...state,
    isSubmittingLogin: false,
    validationErrors: action.errors
  })),
  on(authActions.logout, (state) => ({
    ...state
  })),
  on(authActions.logoutSuccess, (state) => ({
    ...state,
    currentUser: undefined
  })),
  on(authActions.logoutFailure, (state, action) => ({
    ...state
  })),
  on(authActions.initUser, (state, action) => ({
    ...state,
    currentUser: action.currentUser
  }))

)
