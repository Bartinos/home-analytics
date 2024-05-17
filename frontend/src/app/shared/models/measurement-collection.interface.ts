import { Measurement } from "./measurement.interface";
import { Topic } from "./topic.interface";

export interface MeasurementCollection{
  // readonly topic: Topic,
  isFetching: boolean,
  measurements: Measurement[]
}
