#include "Arduino.h"
#include "sensor/Av1Sensor.h"

class XbeeNode{

public:
  XbeeNode(String identifier, byte mac[8], Av1Sensor *sensor);
  String identifier;
  byte mac[8]; 
  Av1Sensor *sensor;
  
private:
};


