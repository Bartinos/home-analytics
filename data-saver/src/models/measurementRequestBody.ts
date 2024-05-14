import { Av1Packet } from "./av1Packet.js";
import { Av1Topic } from "./av1Topic.js";

export class MeasurementRequestBody {
  constructor(
    country: string,
    city: string,
    building: string,
    space: string,
    sensor: string,
    value: any,
    timestamp?: number
  ) {

  }
  static fromAv1PacketAndAv1Topic(av1Packet: Av1Packet, av1Topic: Av1Topic): MeasurementRequestBody {
    const measurementRequestBody = new MeasurementRequestBody();

  }
}
