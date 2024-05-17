import { AuthState } from "./auth/auth.reducer";
import { MeasurementState } from "./measurementState/measurement.reducer";

export interface AppState {
  authState: AuthState,
  measurementState: MeasurementState
}
