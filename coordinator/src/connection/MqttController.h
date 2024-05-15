#pragma once
#include "PubSubClient.h"
#include <Arduino.h>
#include <Config.h>
#include <Ethernet.h>
#include "ArduinoJson.h"
class MqttController
{

public:
    MqttController(EthernetClient *ethernetClient);
    void setupMqttConnection();
    bool getMqttConnectionStatus();
    void loop(); 
    void sendMqttPacket(String topic, StaticJsonDocument<60> json);
private:
    PubSubClient *mqttClient; 
};


