#ifndef AV1_SENSOR_H
#define AV1_SENSOR_H
#include <Arduino.h>

class Av1Sensor {
public:
    String sensorName;
    virtual float parseReadingIntoMeasurement() = 0;
};

#endif
