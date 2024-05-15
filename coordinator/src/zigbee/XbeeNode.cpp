#include "XbeeNode.h"
#include "Config.h"
#include "sensor/Av1Sensor.h"

XbeeNode::XbeeNode(String identifier, String space, byte mac[8], Av1Sensor *sensor){
  this->identifier = identifier;
  for(int i = 0; i < 8; ++i){
    this->mac[i] = mac[i];
  }
  this->sensor = sensor;
  this->space = space;
}


bool XbeeNode::compareMac(const byte otherMac[8]) {
  return memcmp(this->mac, otherMac, 8) == 0;
}

String XbeeNode::getTopic(){
  // String topic = TOPIC_DATA_MEASUREMENT_PUB_PREFIX;
  // topic += "/";
  // topic += this->space;
  // topic += "/";
  // topic += this->sensor->getSensorName();
  // return topic;
  // return String(TOPIC_DATA_MEASUREMENT_PUB_PREFIX) + "/" + this->space + "/" + this->sensor->getSensorName();
  return "test";
}
