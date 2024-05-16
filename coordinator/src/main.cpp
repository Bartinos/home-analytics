#include <Arduino.h>
#include <SPI.h>
#include "connection/EthernetController.h"
#include "connection/MqttController.h"
#include "sensor/LdrSensor.h"
#include "sensor/PotentiometerSensor.h"
#include "sensor/TemperatureSensor.h"
#include "zigbee/XbeeNode.h"
#include "zigbee/XbeeSerialHandler.h"
#include "zigbeeToMqtt/XbeeReadingToMqttController.h"

// // Initialize nodes
//
// byte ENDN2_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x40, 0x8B, 0x17, 0xF4};
// PotentiometerSensor potentiometerSensor;
// XbeeNode endn2 = XbeeNode("ENDN2", "heater", ENDN2_MAC, &potentiometerSensor);
// byte ENDN3_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x41, 0x93, 0x0B, 0x47};
// LdrSensor ldrSensor;
// XbeeNode endn3 = XbeeNode("ENDN3", "livingroom", ENDN3_MAC, &ldrSensor);
// // byte ENDN4_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x40, 0x69, 0x50, 0xF3};
// // XbeeNode endn4 = XbeeNode("ENDN4", ENDN4_MAC, new TemperatureSensor());
//
// byte ROUTER1_MAC[8] = {0x00, 0x13, 0xA2, 0x00, 0x41, 0x93, 0x0b, 0x09};
// TemperatureSensor temperatureSensor;
// XbeeNode router1 = XbeeNode("ROUTER1", "stairs", ROUTER1_MAC, &temperatureSensor);
//
// std::vector<XbeeNode> xbeeNodes ={
//   endn2,
//   endn3,
//   router1
// };

// Consider using shared pointer
EthernetClient ethernetClient;
EthernetController ethernetController(&ethernetClient);

MqttController mqttController(&ethernetClient);
XbeeReadingToMqttController xbeeReadingToMqttController(&mqttController);


XbeeSerialHandler xbeeSerialHandler;

void setup() {
  Serial.begin(9600);
  Serial.println("Starting coordinator..."); 

  // do {
    ethernetController.setupNetworkInterface();
  // } while ((ethernetController.getNIStatus() == false));
  // do {
  //   mqttController.setupMqttConnection();
  // } while (mqttController.getMqttConnectionStatus() == false);

    mqttController.setupMqttConnection();
    
}

void loop() {
  mqttController.loop();
  if(xbeeSerialHandler.isFrameAvailable()){
    XbeeReading xbeeReading = xbeeSerialHandler.createReadingFromSerial();
    xbeeReadingToMqttController.xbeeReadingToMqtt(xbeeReading);
  }
  // Serial.print("running");
}
