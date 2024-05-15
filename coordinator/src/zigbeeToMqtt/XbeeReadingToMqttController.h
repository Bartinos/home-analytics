#pragma once
#include "zigbee/XbeeNode.h"
#include "zigbee/XbeeReading.h"
#ifndef XBEE_READING_TO_MQTT_CONTROLLER_H
#define XBEE_READING_TO_MQTT_CONTROLLER_H
#include "connection/MqttController.h"
#include <vector>
#include "zigbee/XbeeReading.h"
class XbeeReadingToMqttController {

public:
  XbeeReadingToMqttController(MqttController *mqttController, std::vector<XbeeNode> &xbeeNodes);
  void xbeeReadingToMqtt(XbeeReading xbeeReading);
private:
  MqttController *mqttController;
  std::vector<XbeeNode>& xbeeNodes;
};

#endif // !XBEE_READING_TO_MQTT_CONTROLLER_H
