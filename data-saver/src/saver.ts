import mqtt from "mqtt"; // import namespace "mqtt"
import { sendMeasurement } from './controllers/measurementController.js';
import { Av1Topic } from "./models/av1Topic.js";
const MQTT_AV1_TOPIC = "netherlands/breda/home/+/+";
const MQTT_OLD_TOPIC = "home/livingroom/#";
let client = mqtt.connect("mqtt://localhost:1883"); // create a client


client.on("connect", () => {
  client.subscribe(MQTT_OLD_TOPIC, (err) => {
    if (err) {
      console.error(`Could not subscribe to topic: ${err}`);
    }
  });
});

client.on("message", async (topic, message) => {
  console.log(`Message received on topic: ${topic.toString()}`);
  console.log(`Body: \n${message.toString()}`);

  const av1Topic: Av1Topic = Av1Topic.fromTopicString(topic);

  // Exit early if not a valid av1Topic
  if(!av1Topic) return;
  // TODO: Validate topic before parsing data
  if(av1Topic.isMeasurementTopic()){
    await sendMeasurement(av1Topic, message.toString()); 
  }
});
