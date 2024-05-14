#include "XbeeNode.h"
#include "sensor/Av1Sensor.h"

XbeeNode::XbeeNode(String identifier, byte mac[8], Av1Sensor *sensor){
  this->identifier = identifier;
  for(int i = 0; i < 8; ++i){
    this->mac[i] = mac[i];
  }
  this->sensor = sensor;
}


bool XbeeNode::compareMac(byte otherMac[8]){
  for(char i = 0; i < 8; i++){
    if(this->mac[i] != otherMac[i]){
      return false;  
    }
  }
  return true;
}
