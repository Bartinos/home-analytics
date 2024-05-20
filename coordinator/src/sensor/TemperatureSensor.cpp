#include "TemperatureSensor.h"

TemperatureSensor::TemperatureSensor(){
  // Troubleshoot bad variables
  // this->sensorName = "temperature";
  // this->type = "float";
}

String TemperatureSensor::getType(){
  return "float";
}

String TemperatureSensor::getSensorName(){
  return "temperature";
}

float TemperatureSensor::parseReadingIntoMeasurement(int reading
){
  if(reading > 2000){
    return INVALID_READING;
  }   

  // Serial.print(reading);
  float percentage = reading / ADC_RESOLUTION;
  float volt = 5.0 * percentage;
  volt = volt - 0.5; // offset 
  float milliVolt = volt * 1000;
  float tempC = milliVolt / 100;

  return tempC;
}

