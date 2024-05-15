#ifndef XBEE_READING_H
#define XBEE_READING_H
#include "Arduino.h"
struct XbeeReading
{
    byte mac[8];
    int analogReading;
    
};

#endif // !XBEE_READING_H

