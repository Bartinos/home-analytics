import { createReducer, on } from "@ngrx/store";
import { MeasurementCollection } from "../../shared/models/measurement-collection.interface";
import { Measurement } from "../../shared/models/measurement.interface";
import { measurementActions } from "./measurement.actions";
import { Topic } from "../../shared/models/topic.interface";

export interface MeasurementState {
  // isFetching: boolean,
  temperatureMeasurementCollection: MeasurementCollection,
  heaterMeasurementCollection: MeasurementCollection,
  brightnessMeasurementCollection: MeasurementCollection,
}

export const temperatureTopic: Topic = {
  country: "netherlands",
  city: "breda",
  building: "home",
  space: "stairs",
  sensor: "temperature"
}

export const heaterTopic: Topic = {
      country: "netherlands",
      city: "breda",
      building: "home",
      space: "livingroom",
      sensor: "heaterRotation"
}

export const brightnessTopic: Topic = {
      country: "netherlands",
      city: "breda",
      building: "home",
      space: "livingroom",
      sensor: "brightness"
}

export const initialMeasurementState: MeasurementState = {
  // isFetching: false,
  temperatureMeasurementCollection: {
    isFetching: false,
    measurements: []
  },
  heaterMeasurementCollection: {
    isFetching: false,
    measurements: []

  },
  brightnessMeasurementCollection: {
    isFetching: false,
    measurements: []
  }
}

export const measurementReducer = createReducer(
  initialMeasurementState,
  on(measurementActions.fetchTemperatureMeasurements, (state) => ({
    ...state,
    temperatureMeasurementCollection: {
      ...state.temperatureMeasurementCollection,
      isFetching: true,
    }
  })),
  on(measurementActions.fetchTemperatureMeasurementsSuccess, (state, { measurements }) => ({
    ...state,
    temperatureMeasurementCollection: {
      measurements: measurements,
      isFetching: false,
    }
  })),
  on(measurementActions.fetchTemperatureMeasurementsFailure, (state) => ({
    ...state,
    temperatureMeasurementCollection: {
      ...state.temperatureMeasurementCollection,
      isFetching: false,
    }
  }))
)
