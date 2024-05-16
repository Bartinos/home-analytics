import { Av1Packet } from "../models/av1Packet.js";
import { Av1Topic } from "../models/av1Topic.js";
import { MeasurementRequestBody, measurementRequestBodyFromAv1PacketAndAv1Topic } from "../models/measurementRequestBody.js";
import { parseAv1Packet } from "../parsers/parseAv1.js";
import { postMeasurement } from "../services/measurementService.js";

const sendMeasurement = async (measurementTopic: Av1Topic, message: string) => {
  const av1Packet: Av1Packet = parseAv1Packet(message);
  if (!av1Packet) {
    console.error("Could not properly parse Av1Packet");
    return;
  }
  const av1MeasurementRequestBody: MeasurementRequestBody = measurementRequestBodyFromAv1PacketAndAv1Topic(av1Packet, measurementTopic);
  await postMeasurement(av1MeasurementRequestBody);
}

export {
  sendMeasurement
}
