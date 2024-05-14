#include "XbeeSerialHandler.h"

XbeeSerialHandler::XbeeSerialHandler(std::vector<XbeeNode> &xbeeNodes) : xbeeNodes(xbeeNodes) {
}

void XbeeSerialHandler::handleSerial(){
  // for (auto xbeeNode : this->xbeeNodes) {
  //   Serial.println(xbeeNode.identifier);
  // }
}
