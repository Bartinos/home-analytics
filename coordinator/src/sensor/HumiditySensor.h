#ifndef HUMIDITY_SENSOR_H
#define HUMIDITY_SENSOR_H
#include "Av1Sensor.h"

class HumiditySensor : public Av1Sensor {
public:
  HumiditySensor();
  float parseReadingIntoMeasurement(int reading
) override; 
  String getSensorName() override; 
  String getType() override;
};

#endif // !HUMIDITY_SENSOR_H


