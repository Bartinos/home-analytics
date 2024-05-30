import env from "dotenv";
import { exit } from "process";
env.config({path: "./.env"});
import mqtt from "mqtt"; // import namespace "mqtt"
import { sendMeasurement } from './controllers/measurementController.js';
import { Av1Topic } from "./models/av1Topic.js";
import * as fs from 'fs';

console.log("Starting DataSaver")
console.log(`Api at: ${process.env.API_URL}` )
if (!process.env.ACCESS_TOKEN || !process.env.API_URL || !process.env.MQTT_BROKER_TLS_URL){
  console.error("Crucial environment variable(s) not defined, aborting...");
  exit();
}

const MQTT_SIMPLIFIED_AV1_TOPIC = "+/breda/home/#";
// const MQTT_OLD_TOPIC = "home/livingroom/#";

let client = mqtt.connect(process.env.MQTT_BROKER_TLS_URL, {
  ca: fs.readFileSync('/certs/ca.crt')
}); // create a client

client.on("connect", () => {
  client.subscribe(MQTT_SIMPLIFIED_AV1_TOPIC, (err) => {
    if (err) {
      console.error(`Could not subscribe to topic: ${err}`);
      exit();
    }
  });
});

client.on("message", async (topic, message) => {
  console.log(`Message received on topic: ${topic.toString()}`);
  console.log(`Body: \n${message.toString()}`);

  const av1Topic: Av1Topic = Av1Topic.fromSimplifiedTopicString(topic);

  // Exit early if not a valid av1Topic
  if(!av1Topic) {
    console.warn("Something went wrong when parsing the topic to Av1" + "\n");
    return;
  }
  if(av1Topic.isMeasurementTopic()){
    await sendMeasurement(av1Topic, message.toString()); 
  }
  console.log();
});
