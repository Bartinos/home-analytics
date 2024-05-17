import { createReducer, on } from "@ngrx/store"
import {  userActions } from "./user.actions"
import { CurrentUser } from "../../shared/models/currentUser.interface"
import { BackendErrors } from "../../shared/models/backendErrors.interface"

export interface UserState {
  currentUser: CurrentUser | null | undefined,
  isSubmittingLogin: boolean,
  // error: string,
  // status: 'pending' | 'loading' | 'error' | 'success'
  isLoading: boolean,
  validationErrors: BackendErrors | null
  // user: UserState;
}

export const initialUserState: UserState = {
  currentUser: undefined,
  isSubmittingLogin: false,
  // error: '',
  // status: 'pending'
  isLoading: false,
  validationErrors: null
}

export const userReducer = createReducer(
  initialUserState,
  on(userActions.login, (state) => ({
    ...state,
    isSubmittingLogin: true,
    // status: 'loading' as const
    validationErrors: null
  })),
  on(userActions.loginSuccess, (state, action) => ({
    ...state,
    isSubmittingLogin: false,
    user: action.currentUser,
    // status: 'success' as const
  })),
  on(userActions.loginFailure, (state, action) => ({
    ...state,
    isSubmittingLogin: false,
    validationErrors: action.errors
    // status: 'error' as const
  }))
)
