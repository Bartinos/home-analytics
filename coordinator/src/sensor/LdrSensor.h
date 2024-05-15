#ifndef LDR_SENSOR_H
#define LDR_SENSOR_H
#include "Av1Sensor.h"

class LdrSensor : public Av1Sensor
{
public:
    LdrSensor();
    float parseReadingIntoMeasurement(int reading
) override;
    String getSensorName() override; 
    String getType() override;
  };
#endif // !LDR_SENSOR_H
