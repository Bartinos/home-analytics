#ifndef LDR_SENSOR_H
#define LDR_SENSOR_H
#include "Av1Sensor.h"

class LdrSensor : public Av1Sensor
{
public:
    float parseReadingIntoMeasurement(int reading
) override;
  };
#endif // !LDR_SENSOR_H