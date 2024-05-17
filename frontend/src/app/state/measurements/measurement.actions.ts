import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Measurement } from "../../shared/models/measurement.interface";
import { GetMeasurementsRequest } from "../../shared/models/get-measurements-request.interface";

export const measurementActions = createActionGroup({
  source: 'measurement',
  events: {
    // 'fetch temperature measurements': props<{ since: number}>(),
    'fetch temperature measurements': props<{ request: GetMeasurementsRequest}>(),
    'fetch temperature measurements success': props<{ measurements: Measurement[]}>(),
    'fetch temperature measurements failure': emptyProps(),

    // 'fetch all measurements success': props
  }
})
