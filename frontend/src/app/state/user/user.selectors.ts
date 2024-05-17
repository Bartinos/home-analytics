import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "./user.reducer";

export const selectUserState = (state: AppState) => state.userState;
export const selectCurrentUser = createSelector(
  selectUserState,
  (userState: UserState) => userState.currentUser
)
export const selectIsSubmittingLogin = createSelector(
  selectUserState,
  (userState: UserState) => userState.isSubmittingLogin
)

// export const selectIs
