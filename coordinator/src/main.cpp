#include <Arduino.h>
#include <SPI.h>
#include "connection/EthernetController.h"
#include "connection/MqttController.h"
#include "zigbee/XbeeNode.h"

// Consider using shared pointer
EthernetClient ethernetClient;
EthernetController *ethernetController = new EthernetController(&ethernetClient);
MqttController *mqttController = new MqttController(&ethernetClient);

// Initialize nodes

byte ENDN2_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x40, 0x8B, 0x17, 0xF4};
XbeeNode endn2 = XbeeNode("ENDN2", ENDN2_MAC);
byte ENDN3_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x41, 0x93, 0x0B, 0x47};
XbeeNode endn3 = XbeeNode("ENDN3", ENDN3_MAC);
byte ENDN4_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x40, 0x69, 0x50, 0xF3};
XbeeNode endn4 = XbeeNode("ENDN4", ENDN4_MAC);

XbeeNode xbeeNodes[] ={
  endn2,
  endn3,
  endn4
};

void setup() {
  Serial.begin(9600);
  Serial.println("Starting coordinator..."); 
  do {
    ethernetController->setupNetworkInterface();
  } while ((ethernetController->getNIStatus() == false));
  do {
    mqttController->setupMqttConnection();
  } while (mqttController->getMqttConnectionStatus() == false);
}

void loop() {
  mqttController->loop();
  // bool mS = mqttController->getMqttConnectionStatus();
  // Serial.println(mS);
}
