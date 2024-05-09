import mqtt from "mqtt"; // import namespace "mqtt"
const MQTT_AV1_TOPIC = "netherlands/breda/home/+/+";
const MQTT_OLD_TOPIC = "home/livingroom/#";
let client = mqtt.connect("mqtt://localhost:1883"); // create a client


client.on("connect", () => {
  client.subscribe(MQTT_OLD_TOPIC, (err) => {
    if (err) {
      console.error(`Could not connect to MQTT-broker: ${err}`);
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`Message received on topic: ${topic.toString()}`);
  console.log(`Body: \n${message.toString()}`);
});
