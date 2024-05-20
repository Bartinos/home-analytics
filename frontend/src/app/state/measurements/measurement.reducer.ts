import { createReducer, on } from "@ngrx/store";
import { MeasurementCollection } from "../../shared/models/measurement-collection.interface";
import { measurementActions } from "./measurement.actions";
import { Topic } from "../../shared/models/topic.interface";

export interface MeasurementState {
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
      sensor: "heater"
}

export const brightnessTopic: Topic = {
      country: "netherlands",
      city: "breda",
      building: "home",
      space: "livingroom",
      sensor: "brightness"
}

export const initialMeasurementState: MeasurementState = {
  temperatureMeasurementCollection: {
    isFetching: false,
    name: "Temperature",
    measurements: [],
    timeOfLastFetch: undefined,
    topic: temperatureTopic
  },
  heaterMeasurementCollection: {
    isFetching: false,
    name: "Heater Level",
    measurements: [],
    timeOfLastFetch: undefined,
    topic: heaterTopic

  },
  brightnessMeasurementCollection: {
    isFetching: false,
    name: "Brightness",
    measurements: [],
    timeOfLastFetch: undefined,
    topic: brightnessTopic
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
      ...state.temperatureMeasurementCollection,
      measurements: measurements.concat(state.temperatureMeasurementCollection.measurements),
      isFetching: false,
      timeOfLastFetch: new Date()
    }
  })),
  on(measurementActions.fetchTemperatureMeasurementsFailure, (state) => ({
    ...state,
    temperatureMeasurementCollection: {
      ...state.temperatureMeasurementCollection,
      isFetching: false,
    }
  })),
  on(measurementActions.fetchHeaterMeasurements, (state) => ({
    ...state,
    heaterMeasurementCollection: {
      ...state.heaterMeasurementCollection,
      isFetching: true,
    }
  })),
  on(measurementActions.fetchHeaterMeasurementsSuccess, (state, { measurements }) => ({
    ...state,
    heaterMeasurementCollection: {
      ...state.heaterMeasurementCollection,
      measurements: measurements.concat(state.heaterMeasurementCollection.measurements),
      isFetching: false,
      timeOfLastFetch: new Date()
    }
  })),
  on(measurementActions.fetchHeaterMeasurementsFailure, (state) => ({
    ...state,
    heaterMeasurementCollection: {
      ...state.heaterMeasurementCollection,
      isFetching: false,
    }
  })),
  on(measurementActions.fetchBrightnessMeasurements, (state) => ({
    ...state,
    brightnessMeasurementCollection: {
      ...state.brightnessMeasurementCollection,
      isFetching: true,
    }
  })),
  on(measurementActions.fetchBrightnessMeasurementsSuccess, (state, { measurements }) => ({
    ...state,
    brightnessMeasurementCollection: {
      ...state.brightnessMeasurementCollection,
      measurements: measurements.concat(state.brightnessMeasurementCollection.measurements),
      isFetching: false,
      timeOfLastFetch: new Date(),
    }
  })),
  on(measurementActions.fetchBrightnessMeasurementsFailure, (state) => ({
    ...state,
    brightnessMeasurementCollection: {
      ...state.brightnessMeasurementCollection,
      isFetching: false,
    }
  })),
)
