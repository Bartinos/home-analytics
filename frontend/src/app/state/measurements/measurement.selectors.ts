import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { MeasurementState } from "./measurement.reducer";

export const selectMeasurementState = (state: AppState) => state.measurementState;

export const selectTemperatureMeasurementCollection = createSelector(
  selectMeasurementState,
  (measurementState: MeasurementState) => measurementState.temperatureMeasurementCollection
);

export const selectHeaterMeasurementCollection = createSelector(
  selectMeasurementState,
  (measurementState: MeasurementState) => measurementState.heaterMeasurementCollection
);

export const selectBrightnessMeasurementCollection = createSelector(
  selectMeasurementState,
  (measurementState: MeasurementState) => measurementState.brightnessMeasurementCollection
)
