#pragma once
#include "PubSubClient.h"
#include <Arduino.h>
#include <Config.h>
#include <Ethernet.h>
class MqttController
{

public:
    MqttController(EthernetClient *ethernetClient);
    void setupMqttConnection();
    bool getMqttConnectionStatus();
    void loop(); 
private:
    PubSubClient *mqttClient; 
};


