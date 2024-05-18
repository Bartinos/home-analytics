#include "EthernetController.h"

EthernetController::EthernetController(EthernetClient *ethernetClient) : ethClient(ethernetClient) {
}

void EthernetController::setupNetworkInterface(){

  // start the Ethernet connection:
  Serial.println("Initialize Ethernet with DHCP:");
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    if (Ethernet.hardwareStatus() == EthernetNoHardware) {
      Serial.println("Ethernet shield was not found");
    } else if (Ethernet.linkStatus() == LinkOFF) {
      Serial.println("Ethernet cable is not connected.");
    }
    while (true) {
      delay(1);
    }
  }
  Serial.print("IP address: ");
  Serial.println(Ethernet.localIP());
}

bool EthernetController::getNIStatus() {
  int linkStatus = Ethernet.linkStatus();
  if (linkStatus == LinkOFF) {
    return false;
  } else {
    return true;
  }
}
