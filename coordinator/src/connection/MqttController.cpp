#include "MqttController.h"


MqttController::MqttController(EthernetClient *ethClient) : mqttClient(PubSubClient(*ethClient)){

  // this.mqttClient = new PubSubClient(*ethClient);
}

void MqttController::setupMqttConnection(){
    
    mqttClient.setServer(SERVER_ADDRESS, 1883);
    // mqttClient.setCallback(callback);

    if (mqttClient.connect(CLIENT_ID))
    {
        // Serial.println(mqttClient.state()); //  will provide more information
        
        // mqttClient.setBufferSize(2048);
    }
    else
    {
        // connection failed
        Serial.println("Mqtt failed: ");
        Serial.println(mqttClient.state());           
    }
}

bool MqttController::getMqttConnectionStatus(){
    if (mqttClient.connected() == false)
    {
        Serial.println("Mqtt connection lost");
        return false;
    }
    return true;
}

void MqttController::loop(){
  this->mqttClient.loop();
}

void MqttController::sendMqttPacket(const char topic[], StaticJsonDocument<20> json){
  char buffer[20];
  serializeJson(json, buffer);
  // Serial.println(buffer);
  // // client.publish("topic", buffer);
  this->mqttClient.publish(topic, buffer);
}
