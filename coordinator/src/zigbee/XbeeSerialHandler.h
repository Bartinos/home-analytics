#pragma once
#ifndef XBEE_SERIAL_HANDLER_H
#define XBEE_SERIAL_HANDLER_H
#include <Arduino.h>
#include "XbeeNode.h"
#include <StandardCplusplus.h>
#include <vector>
#include "../sensor/TemperatureSensor.h"

#define ZIGBEE_FRAME_SIZE 21
#define ZIGBEE_START_BYTE 0x7E
// #define ZIGBEE_MAC_START_INDEX 4

class XbeeSerialHandler {
  public:
    struct XbeeReading
    {
        byte mac[8];
        int analogReading;
        
    };
    XbeeSerialHandler(std::vector<XbeeNode> &xbeeNodes);
    std::vector<XbeeNode>& xbeeNodes;
    bool isFrameAvailable();
    XbeeReading createReadingFromSerial();

private:
};


#endif // !XBEE_SERIAL_HANDLER_H


