#include "XbeeSerialHandler.h"
#include "HardwareSerial.h"

XbeeSerialHandler::XbeeSerialHandler(std::vector<XbeeNode> &xbeeNodes) : xbeeNodes(xbeeNodes) {
}

void XbeeSerialHandler::handleSerial(){
  byte receivedMac[8];
  int analogMSB;
  int analogLSB;

  if(Serial.available() >= ZIGBEE_FRAME_SIZE){
    if(Serial.read() != ZIGBEE_START_BYTE) {
      return;
    }

    for(int byteIndex = 0; byteIndex < ZIGBEE_FRAME_SIZE; byteIndex++){
      if(byteIndex > 2 && byteIndex < 11){
        // Read mac
        char macIndex = byteIndex - 3;
        receivedMac[macIndex] = Serial.read();
      }else if(byteIndex == 18){ 
        analogMSB = Serial.read();
      }else if(byteIndex == 19){
        analogLSB = Serial.read();
      }else{
        Serial.read(); // next byte
      }
    }

    int analogReading = analogLSB + (analogMSB * 256);
    float measurement;

    for(auto xbeeNode: this->xbeeNodes){
      if (xbeeNode.compareMac(receivedMac)){
        Serial.print("Received data from: ");
        Serial.println(xbeeNode.identifier);

        float reading = xbeeNode.sensor->parseReadingIntoMeasurement(analogReading);
        if(reading == INVALID_READING){
          Serial.println("Invalid reading");
          return;
        }
        measurement = reading;
        Serial.println(measurement);
        Serial.println();

        return;
      }
    }
  }
}
