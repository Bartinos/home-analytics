import fs from 'fs';

fs;
//
console.log("test");

import mqtt from "mqtt"; // import namespace "mqtt"
let client = mqtt.connect("mqtt://localhost:1883"); // create a client


client.on("connect", () => {
  client.subscribe("presence", (err) => {
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
