import Joi from 'joi';
import { Av1Packet } from '../models/av1Packet.js';
const MAX_SUPPORTED_UNIX_DATE = 8640000000000 // 2243-10-17T00:00:00.000Z, prevent new Date() from creating invalid date
const MIN_SUPPORTED_UNIX_DATE = -8640000000000

const av1PacketFormatScheme = Joi.object({
  type: Joi.string(),
  value: Joi.required(),
  timestamp: Joi.date().timestamp('unix').min(MIN_SUPPORTED_UNIX_DATE).max(MAX_SUPPORTED_UNIX_DATE)
});

function parseAv1Packet(message: string): Av1Packet{
  const packet = JSON.parse(message);
  const { error } = av1PacketFormatScheme.validate(packet);
  if(error){
    console.error(error);
    return null;
  }
  const av1Packet: Av1Packet = {
    type: packet.type,
    value: packet.value,
    timestamp: packet.timestamp
  };
  return av1Packet;
}

export {
  parseAv1Packet
}
