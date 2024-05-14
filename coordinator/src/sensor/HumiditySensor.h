#ifndef HUMIDITY_SENSOR_H
#define HUMIDITY_SENSOR_H
#include "Av1Sensor.h"

class HumiditySensor : public Av1Sensor {
  public:
     float parseReadingIntoMeasurement() override; 
};

#endif // !HUMIDITY_SENSOR_H


