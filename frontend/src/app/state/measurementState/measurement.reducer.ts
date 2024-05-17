import { createReducer, on } from "@ngrx/store";
import { MeasurementCollection } from "../../shared/models/measurement-collection.interface";
import { Measurement } from "../../shared/models/measurement.interface";
import { measurementActions } from "./measurement.actions";

export interface MeasurementState {
  isFetching: boolean,
  temperatureMeasurements: MeasurementCollection,
  heaterMeasurements: MeasurementCollection,
  brightnessMeasurements: MeasurementCollection ,
}


export const initialMeasurementState: MeasurementState ={
  isFetching: false,
  temperatureMeasurements: {
    topic:{
      country: "netherlands",
      city: "breda",
      building: "home",
      space: "stairs",
      sensor: "temperature"

    },
    measurements: []
  },
  heaterMeasurements: {
    topic:{
      country: "netherlands",
      city: "breda",
      building: "home",
      space: "livingroom",
      sensor: "heaterRotation"

    },
    measurements: []

  },
  brightnessMeasurements: {
    topic:{
      country: "netherlands",
      city: "breda",
      building: "home",
      space: "livingroom",
      sensor: "brightness"

    },
    measurements: []
  }
}

export const measurementReducer = createReducer(
  initialMeasurementState,
  on(measurementActions.fetchTemperatureMeasurements, (state) => ({
    ...state,
    isFetching: true
  })),
  on(measurementActions.fetchTemperatureMeasurementsSuccess, (state, {measurements}) => ({
    ...state,
    isFetching: false,
    // temperatureMeasurements.measurements = measurements
    temperatureMeasurements: {
      measurements: measurements,
      topic: state.temperatureMeasurements.topic
    }
  })),
  on(measurementActions.fetchTemperatureMeasurementsFailure, (state) => ({
    ...state,
    isFetching: false
  }))
)
