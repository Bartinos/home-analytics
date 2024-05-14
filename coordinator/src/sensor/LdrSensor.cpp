#include "LdrSensor.h"

float LdrSensor::parseReadingIntoMeasurement(int reading
){
  if(reading > 2000){
    return INVALID_READING;
  }
  return reading;
}
