#pragma once
#include "sensor/LdrSensor.h"
#include "sensor/PotentiometerSensor.h"
#include "sensor/TemperatureSensor.h"
#include "zigbee/XbeeNode.h"
#include "zigbee/XbeeReading.h"
#ifndef XBEE_READING_TO_MQTT_CONTROLLER_H
#define XBEE_READING_TO_MQTT_CONTROLLER_H
#include "connection/MqttController.h"
#include "zigbee/XbeeReading.h"

class XbeeReadingToMqttController {

public:
  XbeeReadingToMqttController(MqttController *mqttController);
  void xbeeReadingToMqtt(XbeeReading xbeeReading);
private:
  MqttController *mqttController;
  // std::vector<XbeeNode>& xbeeNodes;
  byte ENDN2_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x40, 0x8B, 0x17, 0xF4};
  PotentiometerSensor potentiometerSensor;
  XbeeNode endn2 = XbeeNode("ENDN2", "heater", ENDN2_MAC, &potentiometerSensor);
  byte ENDN3_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x41, 0x93, 0x0B, 0x47};
  LdrSensor ldrSensor;
  XbeeNode endn3 = XbeeNode("ENDN3", "livingroom", ENDN3_MAC, &ldrSensor);
  // byte ENDN4_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x40, 0x69, 0x50, 0xF3};
  // XbeeNode endn4 = XbeeNode("ENDN4", ENDN4_MAC, new TemperatureSensor());

  byte ROUTER1_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x41, 0x93, 0x0b, 0x09};
  TemperatureSensor temperatureSensor;
  XbeeNode router1 = XbeeNode("ROUTER1", "stairs", ROUTER1_MAC, &temperatureSensor);
  XbeeNode xbeeNodes[3] = {
    endn2,
    endn3,
    router1
  };
};

#endif // !XBEE_READING_TO_MQTT_CONTROLLER_H
