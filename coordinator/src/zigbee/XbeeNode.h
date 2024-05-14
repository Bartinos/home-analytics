#ifndef XBEE_NODE_H
#define XBEE_NODE_H

#include "Arduino.h"
#include "sensor/Av1Sensor.h"

class XbeeNode{

public:
  XbeeNode(String identifier, byte mac[8], Av1Sensor *sensor);
  String identifier;
  byte mac[8]; 
  Av1Sensor *sensor;
  bool compareMac(byte otherMac[8]);
private:
};


#endif // !XBEE_NODE_H
