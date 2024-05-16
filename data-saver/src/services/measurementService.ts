import { Av1Packet } from "../models/av1Packet.js";
import { Av1Topic } from "../models/av1Topic.js";
import { MeasurementRequestBody } from "../models/measurementRequestBody.js";

const HEADERS = {
  'Content-type': 'application/json; charset=UTF-8',
};
const API_URL = "localhost:3001";

export async function postMeasurement(measurementRequestBody: MeasurementRequestBody) {
  const response = await fetch(
    API_URL + "/measurements",
    {
      method: 'POST', 
      body: JSON.stringify(measurementRequestBody),
      headers: HEADERS
    }
  );

  const data = await response.json();
  console.log(data);

}
