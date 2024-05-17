import { Topic } from "./topic.interface";

export interface GetMeasurementsRequest {
  topic: Topic,
  since?: Date
}
