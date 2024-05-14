#pragma once
#include <Arduino.h>
#include <Ethernet.h>

class EthernetController
{

public:

    void setupNetworkInterface();
    bool getNIStatus();
private:
    EthernetClient ethClient;
    byte mac[6] = {
      0x90, 0xA2, 0xDA, 0x0F, 0x08, 0x03
    };
  
};


