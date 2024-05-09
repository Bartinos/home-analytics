import Joi from 'joi';
const MAX_SUPPORTED_UNIX_DATE = 8640000000000 // 2243-10-17T00:00:00.000Z, prevent new Date() from creating invalid date
const MIN_SUPPORTED_UNIX_DATE = -8640000000000

const av1PacketFormatScheme = Joi.object().keys({
  type: Joi.string().required(),
  value: Joi.required(),
  timestamp: Joi.date().timestamp('unix').min(MIN_SUPPORTED_UNIX_DATE).max(MAX_SUPPORTED_UNIX_DATE)
});

function parseAv1(topic, message) {
  const isValidAv1Format = av1PacketFormatScheme.validate(message);
  return isValidAv1Format;
}

function parseAv1Topic(topic) {
  return undefined;
}

exports = {
  parseAv1,
  parseAv1Topic
}
