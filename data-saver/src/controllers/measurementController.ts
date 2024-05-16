import { Av1Packet } from "../models/av1Packet.js";
import { Av1Topic } from "../models/av1Topic.js";
import { MeasurementRequestBody, measurementRequestBodyFromAv1PacketAndAv1Topic } from "../models/measurementRequestBody.js";
import { parseAv1Packet } from "../parsers/parseAv1.js";

const sendMeasurement = async (measurementTopic: Av1Topic, message: string) => {
  const av1Packet: Av1Packet = parseAv1Packet(message);
  const av1MeasurementRequestBody: MeasurementRequestBody = measurementRequestBodyFromAv1PacketAndAv1Topic(av1Packet, measurementTopic);
}

export {
  sendMeasurement
}
