#include "XbeeNode.h"

XbeeNode::XbeeNode(String identifier, byte mac[8]){
  this->identifier = identifier;
  for(int i = 0; i < 8; ++i){
    this->mac[i] = mac[i];
  }
}
