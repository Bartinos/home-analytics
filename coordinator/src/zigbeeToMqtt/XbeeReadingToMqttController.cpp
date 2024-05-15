#include "XbeeReadingToMqttController.h"

XbeeReadingToMqttController::XbeeReadingToMqttController(MqttController *mqttController, std::vector<XbeeNode> &xbeeNodes) : xbeeNodes(xbeeNodes){
  this->mqttController = mqttController;
}

void XbeeReadingToMqttController::xbeeReadingToMqtt(XbeeReading xbeeReading){
  float measurement;
  StaticJsonDocument<100> av1Payload;

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
      Serial.println(xbeeNode.sensor->getType());
      String sensorName = xbeeNode.sensor->getSensorName();
      Serial.println(sensorName);
      Serial.println();
      // Populate json to send over mqtt
      av1Payload["type"] = String(xbeeNode.sensor->getType());
      av1Payload["value"] = String(measurement);
      // av1Payload["timestamp"]

      this->mqttController->sendMqttPacket("testtest", av1Payload);
      return;
    }
  }
   
   
  
}
