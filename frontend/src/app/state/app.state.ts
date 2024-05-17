import { AuthState } from "./auth/auth.reducer";
import { MeasurementState } from "./measurements/measurement.reducer";

export interface AppState {
  authState: AuthState,
  measurementState: MeasurementState
}
