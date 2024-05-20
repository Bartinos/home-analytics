# Home Analytics
This project is meant for 'profielverdieping 3.3' INFRA for Avans Hogeschool Technical Computer Science. It is a full stack application bundle for analyzing home data retrieved from a zigbee network using Angular, Postgresql, Expressjs, Docker and Cloudflare. The project exists out of multiple applications
* database
* frontend
* DataSaver
* sensor-network
* mqtt-broker
* api
* auth-api
* nginx-proxy
* Cloudflared tunnel
## Database
Currently, the database has been designed to look like this.
```postgresql
CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE active_session (
  id SERIAL PRIMARY KEY,
  person_id INTEGER NOT NULL,
  token VARCHAR UNIQUE NOT NULL,
  FOREIGN KEY (person_id) REFERENCES person (id)
);

CREATE TABLE topic (
  id SERIAL PRIMARY KEY,
  country VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  building VARCHAR NOT NULL,
  space VARCHAR NOT NULL,
  sensor VARCHAR NOT NULL,
  UNIQUE(country, city, building, space, sensor)
);

CREATE TABLE measurement (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER NOT NULL,
  value FLOAT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (topic_id) REFERENCES topic (id)
);
```

It provides basic authentication possibilities with the use of tokens. The database will store only one `person`, but it will be designed with more people in mind. Passwords will be hashed using the [blowfish](https://www.geeksforgeeks.org/blowfish-algorithm-with-examples/) algorithm with salt to emphasize the security aspect of the project. 

As the database will store sensor data from an MQTT broker, the tables `measurement` and `topic` have been created. The `measurement` table is self-explanatory. The `topic` table references the mqtt-topic at which the data has been published on. 

## Frontend
The frontend is a dashboard and is built in Angular 17. A user can log in/out and view the measurements which have been stored in the database. State management is realized with NgRx and the graphs have been built using D3.js.

## DataSaver
DataSaver acts as an intermediary that forwards the data retrieved from the MQTT-broker to the HA-api. The DataSaver client is written in Typescript and runs in nodejs. It subscribes to the MQTT-broker using mqtt.js and sends http requests to the API. 
### Considerations
The proposed architecture has been chosen between the following three solutions. All three of them have their pro's and cons.
#### Subscribed client to HA-api (chosen)
This solution is chosen because it highlights the micro-architecture-based approach and is the most clean to implement. It is easy to scale because of MQTT's [[https://www.hivemq.com/blog/mqtt5-essentials-part7-shared-subscriptions/ | Shared Subcriptions]]. The disadvantage of this approach however is that this sends an http request for each measurement sent to the mqtt-broker. Http requests have a significantly larger overhead as opposed to mqtt-packets, making this solution less efficient. 
#### Subscribed client to database
This solution skips the HA-api and sends the data straight to the database. This is the most efficient approach bandwidth wise because there is no http involved. The drawbacks of this approach are that duplicate code will be written in this client and the HA-api client, which sole purpose is to interface between the clients and the database. The duplicate code can be mitigated by writing a package to be used in the two, however, this will take too much time to implement, making it less efficient development wise.
#### Subscribed HA-api to database
This solution would be the simplest to implement, because the HA-api already can interface with the database and would only need an mqtt-client attached to it. This would make the quickest implementation at the cost of more responsibilities for the HA-api. Having an active connection with an mqtt-broker would make the HA-api not stateless anymore. This could lead to difficult scaling. 

## Sensor Network
Project Home Analytics retrieves data through the use of a Zigbee network. The network exists out of 5 nodes and transmits measurements of humidity, brightness and temperature. The registries on the XBee modules are written with the [XCTU utility from Digi](https://hub.digi.com/support/products/xctu/). Each module has some of their registries changed to match the architecture and their responsibility.
### COORDINATOR - 0013A20041930C72
![[imgs/20240513193936.png | 700]]
**Highlighted settings (the rest is set to default)**
```
CH_VER: 0
API_MO: 1
CE: 1
PANID: 100
```
_Labeled: none_
The coordinator is located in the attic. API mode is enabled and operates with network id 100.
### ROUTER1 - 0013A20041930B09 - Temperature
**Highlighted settings (the rest is set to default)**
```
CH_VER: 1
API_MO: 1
PANID: 100
```
_Labeled: 1_
The router is located on the first floor near the stairs. This location is the center of the house, which will be a suitable spot to route messages from the end-nodes. Because ENDN4 does not function properly, the router will take over its responsibility of measuring and sending temperature data

### ENDN2 - 0013A200408B17F4 - Potentiometer 
![[imgs/20240514112143.png | 700]]
**Highlighted settings (the rest is set to default)**
```
API_MO: 1
PANID: 100
SM: Cyclic Sleep

ST: 10 MS 
SP: 5000 MS
D3: ADC
IR: 5000 MS
```
_Labeled: 2_
ENDN2 will be located on the ground floor to measure the rotation of a potentiometer, which could represent a heater-knob. ENDN2 will send its measurements after every 5 seconds of sleep, the same goes for the other end-nodes.
### ENDN3  - 0013A20041930B47 - LDR
![[imgs/20240514113534.png | 700]]
**Highlighted settings (the rest is set to default)**
```
API_MO: 1
PANID: 100
SM: Cyclic Sleep

ST: 10 MS 
SP: 5000 MS
D3: ADC
IR: 5000 MS
```
_Labeled: 3_
This end-node is located in on the ground floor. It is equipped with a light dependent resistor. 
### ENDN4 - 0013A200406950F3 - Temperature (broken)
![[imgs/20240514111259.png | 700]]
**Highlighted settings (the rest is set to default)**
```
API_MO: 1
PANID: 100
SM: Cyclic Sleep

ST: 10 MS 
SP: 5000 MS
D3: ADC
IR: 5000 MS 
```
_Labeled: 4_
ENDN4 is an XB24-Z7CIT-004 module and was not responsive even when pressing the reset button. After multiple attempts to fix it using the XCTU recovery tool, it still did not show any signs of co-operating. This end-node was planned to be located on the ground floor and would measure the temperature of the living room.

## Mqtt Broker
The mqtt broker is responsible for publishing the data received from the sensor network. It is a simple Mosquitto container deployed using docker.

## HA-api
This API is responsible for retrieving and posting measurements to the database. It is written in javascript using expressjs. The API checks if the client is authenticated using JWT. 

## Auth-api
The auth-api is responsible for authenticating the clients. It is also written in javascript with expressjs. This api is used to log in or out and generating new accessTokens.

## Nginx-proxy
An nginx proxy is deployed to proxy requests to /api (HA-api), /auth (auth-api) or just the frontend. 

## Cloudflared-tunnel
A cloudflared tunnel is deployed using Docker to create a tunnel to the cloudflare servers. This way, the frontend can be reached without needing to expose any ports on the home network. This also makes it so that the IP of the home network will be hidden.
