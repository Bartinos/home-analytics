#include <ArduinoJson.h>
#include <PubSubClient.h>
// #include <XBee.h>
#include <SPI.h>
#include <Ethernet.h>
#include <Arduino.h>

#define ROUTER1COMP "temperature sensor"
#define ROUTER1TOPIC "home/bathroom/temperature"
#define ENDN1COMP "LDR"
#define ENDN1TOPIC "home/livingroom/light"
#define ADC_VREF_mV    5000.0 // in millivolt
#define ADC_RESOLUTION 1024.0

//#define MAX_FRAME_DATA_SIZE 110

// XBee xbee = XBee();
// Rx64Response rx64 = Rx64Response();
EthernetClient ethClient;
PubSubClient mqttClient(ethClient);



// LDR
byte macRouter1[] = {
  0x00, 0x13, 0xA2, 0x00, 0x41, 0x93, 0x0B, 0x09
  };

// LDR 
byte macENDN1[] = {
  0x00, 0x13, 0xA2, 0x00, 0x41, 0x93, 0x0B, 0x47
  };
  

void initializeEthernet(){
  byte mac[] = {
  0x90, 0xA2, 0xDA, 0x0F, 0x08, 0x03
  };
  
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // start the Ethernet connection:
  Serial.println("Initialize Ethernet with DHCP:");
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    if (Ethernet.hardwareStatus() == EthernetNoHardware) {
      Serial.println("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
    } else if (Ethernet.linkStatus() == LinkOFF) {
      Serial.println("Ethernet cable is not connected.");
    }
    while (true) {
      delay(1);
    }
  }
  Serial.print("My IP address: ");
  Serial.println(Ethernet.localIP());
}

void checkConnection(){
    switch (Ethernet.maintain()) {
    case 1:
      //renewed fail
      Serial.println("Error: renewed fail");
      break;

    case 2:
      //renewed success
      Serial.println("Renewed success");
      //print your local IP address:
      Serial.print("My IP address: ");
      Serial.println(Ethernet.localIP());
      break;

    case 3:
      //rebind fail
      Serial.println("Error: rebind fail");
      break;

    case 4:
      //rebind success
      Serial.println("Rebind success");
      //print your local IP address:
      Serial.print("My IP address: ");
      Serial.println(Ethernet.localIP());
      break;

    default:
      //nothing happened
      break;
  }
}

void initializeMqtt(){
  mqttClient.setServer("192.168.2.8", 1883);
  boolean connectionRC = mqttClient.connect("COORDINATOR1");
  Serial.println(mqttClient.state());
  boolean rc = mqttClient.publish("test123321", "This is a test message");
  Serial.println(rc);
}

void setup() {
  Serial.begin(9600);
  initializeEthernet();
  initializeMqtt();
}


void sendToMqtt(int value, char topic[]){
//  StaticJsonBuffer<300> JSONbuffer;
//  JsonObject& JSONencoder = JSONbuffer.createObject();
//  JSONencoder["value"] = value;
//  char JSONmessageBuffer[100];
//  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  char payload[16];
  sprintf(payload, "%d", value);
  mqttClient.publish(topic, payload);
}

boolean compareMac(byte mac1[], byte mac2[]){
  for(char i = 0; i < 8; i++){
    if(mac1[i] != mac2[i]){
      return false;  
    }
  }
  return true;
}

float handleTempData(int data){
  if(data > 2000){
    return -1;
  }   

  float percentage = data / ADC_RESOLUTION;
  float volt = 5 * percentage;
  volt = volt - 0.5; // offset 
  // convert the ADC value to voltage in millivolt
  float milliVolt = volt * 1000;
  // convert the voltage to the temperature in Celsius
  float tempC = milliVolt / 100;

  return tempC;
}

int handleLDRData(int data){
  if(data > 2000){
    return -1;
  }
  return data;
}


  

void loop() {
  checkConnection();
  byte receivedMac[8];
  int analogMSB;
  int analogLSB;

  if(Serial.available() >= 21){
    if(Serial.read() == 0x7E){
      for(int i = 0; i < 21; i++){
        if(i > 2 && i < 11){
          char index = i - 3;
          receivedMac[index] = Serial.read();      
        }else if(i == 18){ // does not scale well, assuming we only receive analog data 
          analogMSB = Serial.read();
        }else if(i == 19){
          analogLSB = Serial.read();
        }else{
          Serial.read(); // next byte
        }
      }
      Serial.println();        

      int analogReading = analogLSB + (analogMSB * 256);
      int presentableReading;
      if(compareMac(macRouter1, receivedMac)){
        Serial.print("Received router data of component: ");
        Serial.println(ROUTER1COMP);
        presentableReading = handleTempData(analogReading);
        if(presentableReading != -1){        
          Serial.print("Received router data: "); 
          Serial.println(presentableReading);
          int intValue = presentableReading;
          sendToMqtt(intValue, ROUTER1TOPIC);
        } else {
          Serial.println("Received invalid data");
        }        
        Serial.println();
        
      } else if(compareMac(macENDN1, receivedMac)){
        Serial.print("Received endnode1 data of component: ");
        Serial.println(ENDN1COMP);
        presentableReading = handleLDRData(analogReading);
        if(presentableReading != -1){
          Serial.print("Received endnode1 data: ");
          Serial.println(presentableReading);
          sendToMqtt(presentableReading, ENDN1TOPIC);
        } else {
          Serial.println("Received invalid data");
        }
        Serial.println();
      } else{
        Serial.println("Unidentified mac received.");
      }   
    }  
  }
}
