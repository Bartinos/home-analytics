#include "TemperatureSensor.h"

float TemperatureSensor::parseReadingIntoMeasurement(int reading
){
  if(reading > 2000){
    return INVALID_READING;
  }   

  float percentage = reading / ADC_RESOLUTION;
  float volt = 5 * percentage;
  volt = volt - 0.5; // offset 
  // convert the ADC value to voltage in millivolt
  float milliVolt = volt * 1000;
  // convert the voltage to the temperature in Celsius
  float tempC = milliVolt / 100;

  return tempC;
}

