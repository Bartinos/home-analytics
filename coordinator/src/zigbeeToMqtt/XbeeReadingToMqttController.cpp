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
      // Populate json to send over mqtt
      av1Payload["value"] = reading;

      this->mqttController->sendMqttPacket(xbeeNode.getTopic().c_str(), av1Payload);
      return;
    }
  }
}
