#include <Arduino.h>
#include <SPI.h>
#include "connection/EthernetController.h"
#include "connection/MqttController.h"

// Consider using shared pointer
EthernetClient ethernetClient;
EthernetController *ethernetController = new EthernetController(&ethernetClient);
MqttController *mqttController = new MqttController(&ethernetClient);

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
