import { CurrentUser } from "./current-user.interface";

export interface AuthResponse {
  user: CurrentUser,
  refreshToken: string,
  accessToken: string
}
