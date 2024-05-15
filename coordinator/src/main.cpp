#include <Arduino.h>
#include <SPI.h>
#include <vector>
#include "connection/EthernetController.h"
#include "connection/MqttController.h"
#include "sensor/HumiditySensor.h"
#include "sensor/LdrSensor.h"
#include "sensor/PotentiometerSensor.h"
#include "sensor/TemperatureSensor.h"
#include "zigbee/XbeeNode.h"
#include "zigbee/XbeeSerialHandler.h"
// Consider using shared pointer
EthernetClient ethernetClient;
EthernetController *ethernetController = new EthernetController(&ethernetClient);

MqttController *mqttController = new MqttController(&ethernetClient);

// Initialize nodes

byte ENDN2_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x40, 0x8B, 0x17, 0xF4};
XbeeNode endn2 = XbeeNode("ENDN2", ENDN2_MAC, new PotentiometerSensor());
byte ENDN3_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x41, 0x93, 0x0B, 0x47};
XbeeNode endn3 = XbeeNode("ENDN3", ENDN3_MAC, new LdrSensor());
// byte ENDN4_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x40, 0x69, 0x50, 0xF3};
// XbeeNode endn4 = XbeeNode("ENDN4", ENDN4_MAC, new TemperatureSensor());

byte ROUTER1_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x41, 0x93, 0x0b, 0x09};
XbeeNode router1 = XbeeNode("ROUTER1", ROUTER1_MAC, new TemperatureSensor());

std::vector<XbeeNode> xbeeNodes ={
  endn2,
  endn3,
  router1
};

XbeeSerialHandler *xbeeSerialHandler = new XbeeSerialHandler(xbeeNodes);

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
  if(xbeeSerialHandler->isFrameAvailable()){
    XbeeSerialHandler::XbeeReading xbeeReading = xbeeSerialHandler->createReadingFromSerial();
    Serial.println(xbeeReading.analogReading);
  }
}
