#ifndef XBEE_NODE_H
#define XBEE_NODE_H

#include "Arduino.h"
#include "sensor/Av1Sensor.h"

class XbeeNode{

public:
  XbeeNode(String identifier, String space, byte mac[8], Av1Sensor *sensor);
  String identifier;
  byte mac[8]; 
  Av1Sensor *sensor;
  bool compareMac(const byte otherMac[8]);
  String getTopic();
private:
  String space;
};


#endif // !XBEE_NODE_H
