#include "LdrSensor.h"

LdrSensor::LdrSensor(){
  // this->type = "float";
  // this->sensorName = "brightness";
}

String LdrSensor::getType(){
  return "float";
}

String LdrSensor::getSensorName(){
  return "brightness";
}

float LdrSensor::parseReadingIntoMeasurement(int reading
){
  if(reading > 2000){
    return INVALID_READING;
  }
  return reading;
}
