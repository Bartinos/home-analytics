import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { AuthState } from "./auth.reducer";

export const selectAuthState = (state: AppState) => state.authState;
export const selectCurrentUser = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.currentUser
)
export const selectIsSubmittingLogin = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.isSubmittingLogin
)

// export const selectIs
