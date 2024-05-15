#pragma once
#ifndef XBEE_SERIAL_HANDLER_H
#define XBEE_SERIAL_HANDLER_H
#include <Arduino.h>
#include "XbeeNode.h"
#include <StandardCplusplus.h>
#include <vector>
#include "XbeeReading.h"
#include "../sensor/TemperatureSensor.h"

#define ZIGBEE_FRAME_SIZE 21
#define ZIGBEE_START_BYTE 0x7E
// #define ZIGBEE_MAC_START_INDEX 4

class XbeeSerialHandler {
  public:
    XbeeSerialHandler();
    bool isFrameAvailable();
    XbeeReading createReadingFromSerial();

private:
};


#endif // !XBEE_SERIAL_HANDLER_H


