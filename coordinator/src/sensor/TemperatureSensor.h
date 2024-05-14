#ifndef TEMP_SENSOR_H
#define TEMP_SENSOR_H
#include "Av1Sensor.h"
#define ADC_VREF_mV    5000.0 // in millivolt
#define ADC_RESOLUTION 1024.0

class TemperatureSensor : public Av1Sensor
{
public:
    float parseReadingIntoMeasurement(int reading
) override;
  };
#endif // !TEMP_SENSOR_H
