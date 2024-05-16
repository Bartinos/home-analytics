import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "./user.reducer";

export const selectUserState = (state: AppState) => state.userState;
export const selectUsername = createSelector(
  selectUserState,
  (state: UserState) => state.username
)
export const selectIsSubmittingLogin = createSelector(
  selectUserState,
  (state: UserState) => state.isSubmittingLogin
)
