import { MeasurementRequestBody } from "../models/measurementRequestBody.js";

export async function postMeasurement(measurementRequestBody: MeasurementRequestBody) {
  let response = undefined;
  try {
    response = await fetch(
      process.env.API_URL + "/measurements",
      {
        method: 'POST',
        body: JSON.stringify(measurementRequestBody),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
        }
      }
    );
    console.log(response.status);
  } catch (error) {
    console.log("Failed to send fetch request");
    console.error(error);
  }
  console.log();
}
