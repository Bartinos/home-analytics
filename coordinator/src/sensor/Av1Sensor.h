#ifndef AV1_SENSOR_H
#define AV1_SENSOR_H
#include <Arduino.h>
#define INVALID_READING -1
class Av1Sensor {

// TODO: Troubleshoot bad variables
// protected:
//   String type;
//   String sensorName;
public:
    virtual String getSensorName() = 0;
    virtual String getType() = 0;
    virtual float parseReadingIntoMeasurement(int reading) = 0;
};

#endif
