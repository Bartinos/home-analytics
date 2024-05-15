#include "HumiditySensor.h"

HumiditySensor::HumiditySensor(){
  // this->type = "float";
  // this->sensorName = "humidity";
}

String HumiditySensor::getType(){
  return "float";
}

String HumiditySensor::getSensorName(){
  return "humidity";  
}

float HumiditySensor::parseReadingIntoMeasurement(int reading){
  return 0.0;
}

