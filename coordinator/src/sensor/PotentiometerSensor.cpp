#include "PotentiometerSensor.h"
#include "Arduino.h"

float PotentiometerSensor::parseReadingIntoMeasurement(int reading
){
  if(reading > 2000){
    return INVALID_READING;
  }

  // Map the readings to a percentage
  reading = map(reading, 0, POTENTIOMETER_MAX_VALUE, 0, 100);
  return reading;
}
