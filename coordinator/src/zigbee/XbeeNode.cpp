#include "XbeeNode.h"
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
  // String topic = "ha-coordinator/AV1/DATA/UD/UD/netherlands/breda/house";
  // String topic = "ha-coordinator/netherlands/breda/house/WORKAAA/" + space;
  // String topic = "hac1/breda/house/" + space + "/" + sensor->getSensorName();
  // topic += "/";
  // topic += this->space;
  // topic += "/";
  // topic += this->sensor->getSensorName();
  // Serial.println(topic);
  return "hac1/breda/home/" + space + "/" + sensor->getSensorName();
  // return String(TOPIC_DATA_MEASUREMENT_PUB_PREFIX) + "/" + this->space + "/" + this->sensor->getSensorName();
  // return "test";
}
