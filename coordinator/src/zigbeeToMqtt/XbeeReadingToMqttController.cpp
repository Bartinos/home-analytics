#include "XbeeReadingToMqttController.h"

XbeeReadingToMqttController::XbeeReadingToMqttController(MqttController *mqttController, std::vector<XbeeNode> &xbeeNodes) : xbeeNodes(xbeeNodes){
  this->mqttController = mqttController;
}

void XbeeReadingToMqttController::xbeeReadingToMqtt(XbeeReading xbeeReading){
    float measurement;

    for(auto xbeeNode: this->xbeeNodes){
      if (xbeeNode.compareMac(xbeeReading.mac)){
        Serial.print("Received data from: ");
        Serial.println(xbeeNode.identifier);

        float reading = xbeeNode.sensor->parseReadingIntoMeasurement(xbeeReading.analogReading);
        if(reading == INVALID_READING){
          Serial.println("Invalid reading");
          return;
        }
        measurement = reading;
        Serial.println(measurement);
        Serial.println();

        return;
      }
    }
    
  
}
