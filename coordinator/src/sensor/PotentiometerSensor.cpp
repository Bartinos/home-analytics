#include "PotentiometerSensor.h"

float PotentiometerSensor::parseReadingIntoMeasurement(int reading
){
  if(reading > 2000){
    return INVALID_READING;
  }
  return reading;
}
