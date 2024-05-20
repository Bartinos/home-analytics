#include "XbeeReadingToMqttController.h"
#include "sensor/LdrSensor.h"
#include "sensor/PotentiometerSensor.h"
#include "sensor/TemperatureSensor.h"

XbeeReadingToMqttController::XbeeReadingToMqttController(MqttController *mqttController){
  this->mqttController = mqttController;
}

void XbeeReadingToMqttController::xbeeReadingToMqtt(XbeeReading xbeeReading){
  StaticJsonDocument<20> av1Payload;

  for(int i = 0; i < 3; i ++){
    XbeeNode xbeeNode = xbeeNodes[i];
    if (xbeeNode.compareMac(xbeeReading.mac)){
      Serial.println(xbeeNode.identifier);

      float reading = xbeeNode.sensor->parseReadingIntoMeasurement(xbeeReading.analogReading);
      // if(reading == INVALID_READING){
      //   Serial.println("Invalid reading");
      //   return;
      // }

      // Populate json to send over mqtt
      // av1Payload["type"] = String(xbeeNode.sensor->getType());
      av1Payload["value"] = reading;
      // av1Payload["timestamp"]

      this->mqttController->sendMqttPacket(xbeeNode.getTopic().c_str(), av1Payload);
      return;
    }
  }
   
   
  
}
