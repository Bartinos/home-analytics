import { createReducer, on } from "@ngrx/store"
import { loginUser } from "./actions"

export interface UserState {
  isSubmittingLogin: boolean,
  error: string,
  status: 'pending' | 'loading' | 'error' | 'success'
  // user: UserState;
}

const initialState: UserState = {
  isSubmittingLogin: false,
  error: '',
  status: 'pending'
}

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state) => ({
    ...state,
    isSubmittingLogin: true
  }))
)
