#include "MqttController.h"


MqttController::MqttController(EthernetClient *ethClient){
  this->mqttClient = new PubSubClient(*ethClient);
}

void MqttController::setupMqttConnection(){
    
    mqttClient->setServer(SERVER_ADDRESS, 1883);
    // mqttClient.setCallback(callback);
    mqttClient->setKeepAlive(15);

    // MqttConnectionManager::serverEventCallback = serverEventCallback;
    // g_serverEventCallback = serverEventCallback; //

    if (mqttClient->connect(CLIENT_ID))
    {
        // Serial.println(mqttClient.state()); //  will provide more information
        mqttClient->setBufferSize(2048);
    }
    else
    {
        // connection failed
        Serial.println("Failed to connect status: ");
        Serial.println(mqttClient->state());           
    }
}

bool MqttController::getMqttConnectionStatus(){
    if (mqttClient->connected() == false)
    {
        Serial.println("Mqtt connection lost");
        return false;
    }
    return true;
}

void MqttController::loop(){
  this->mqttClient->loop();
}
