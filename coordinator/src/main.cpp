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
}
