#ifndef AV1_SENSOR_H
#define AV1_SENSOR_H
#include <Arduino.h>
#define INVALID_READING -1
class Av1Sensor {
public:
    String sensorName;
    virtual float parseReadingIntoMeasurement(int reading) = 0;
};

#endif
