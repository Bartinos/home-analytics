import { Av1Packet } from "./av1Packet.js";
import { Av1Topic } from "./av1Topic.js";

export interface MeasurementRequestBody {
    readonly country: string,
    readonly city: string,
    readonly building: string,
    readonly space: string,
    readonly sensor: string,
    readonly value: any,
    readonly timestamp?: number
}

// export class MeasurementRequest {
//   readonly country: string;
//   readonly city: string;
//   readonly building: string;
//   readonly space: string;
//   readonly sensor: string;
//   readonly value: any;
//   readonly timestamp: number;
//
//   constructor(
//     country: string,
//     city: string,
//     building: string,
//     space: string,
//     sensor: string,
//     value: any,
//     timestamp?: number
//   ) {
//     this.country = country;
//     this.city = city;
//     this.building = building;
//     this.space = space;
//     this.sensor = sensor;
//     this.value = value;
//     if(timestamp) this.timestamp = timestamp;
//   }
//
//    getBody(){
//
//   }
// }


export function measurementRequestBodyFromAv1PacketAndAv1Topic(av1Packet: Av1Packet, av1Topic: Av1Topic): MeasurementRequestBody {
    const timestamp: number = av1Packet.timestamp? av1Packet.timestamp : null;
    const measurementRequestBody: MeasurementRequestBody = {
      country: av1Topic.country,
      city: av1Topic.city,
      building: av1Topic.building,
      space: av1Topic.space,
      sensor: av1Topic.sensor,
      value: av1Packet.value,
      timestamp
    };
    return measurementRequestBody;
  }
