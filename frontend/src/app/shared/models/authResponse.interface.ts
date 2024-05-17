import { CurrentUser } from "./currentUser.interface";

export interface AuthResponse {
  user: CurrentUser,
  refreshToken: string,
  accessToken: string
}
