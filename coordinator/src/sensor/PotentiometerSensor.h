#ifndef POTENTIOMETER_SENSOR_H
#define POTENTIOMETER_SENSOR_H
#include "Av1Sensor.h"
#define POTENTIOMETER_MAX_VALUE 1023 

class PotentiometerSensor : public Av1Sensor
{
public:
    float parseReadingIntoMeasurement(int reading
) override;
  };
#endif // !POTENTIOMETER_SENSOR_H
