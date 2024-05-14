#ifndef TEMP_SENSOR_H
#define TEMP_SENSOR_H
#include "Av1Sensor.h"

class TemperatureSensor : public Av1Sensor
{
public:
    float parseReadingIntoMeasurement() override;
  };
#endif // !TEMP_SENSOR_H
