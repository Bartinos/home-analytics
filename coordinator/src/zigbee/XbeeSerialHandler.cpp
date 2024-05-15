#include "XbeeSerialHandler.h"

XbeeSerialHandler::XbeeSerialHandler()  {
}

bool XbeeSerialHandler::isFrameAvailable(){
  if(Serial.available() >= ZIGBEE_FRAME_SIZE){
    if(Serial.read() != ZIGBEE_START_BYTE) {
      return false;
    }
    return true;
  }
  return false;
  
}

XbeeReading XbeeSerialHandler::createReadingFromSerial(){
  // byte receivedMac[8];
  int analogMSB;
  int analogLSB;

  // if(Serial.available() >= ZIGBEE_FRAME_SIZE){
  //   if(Serial.read() != ZIGBEE_START_BYTE) {
  //     return 0;
  //   }

  XbeeReading xbeeReading;

    for(int byteIndex = 0; byteIndex < ZIGBEE_FRAME_SIZE; byteIndex++){
      if(byteIndex > 2 && byteIndex < 11){
        // Read mac
        char macIndex = byteIndex - 3;
        xbeeReading.mac[macIndex] = Serial.read();
      }else if(byteIndex == 18){ 
        analogMSB = Serial.read();
      }else if(byteIndex == 19){
        analogLSB = Serial.read();
      }else{
        Serial.read(); // next byte
      }
    }

    xbeeReading.analogReading = analogLSB + (analogMSB * 256);

    return xbeeReading;
}
