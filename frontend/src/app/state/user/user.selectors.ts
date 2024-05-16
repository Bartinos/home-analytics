import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "./user.reducer";

export const selectUserState = (state: AppState) => state.userState;
export const selectUsername = createSelector(
  selectUserState,
  (userState: UserState) => userState.username
)
export const selectIsSubmittingLogin = createSelector(
  selectUserState,
  (userState: UserState) => userState.isSubmittingLogin
)
