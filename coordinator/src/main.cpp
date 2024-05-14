#include <Arduino.h>
#include <SPI.h>
#include "connection/EthernetController.h"

EthernetController *ethernetController = new EthernetController();

void setup() {
  Serial.begin(9600);
  Serial.println("Starting coordinator..."); 
  do {
    ethernetController->setupNetworkInterface();
  } while ((ethernetController->getNIStatus() == false));

}

void loop() {
  ethernetController->getNIStatus();
}
