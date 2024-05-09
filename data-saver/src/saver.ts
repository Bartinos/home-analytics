import mqtt from "mqtt"; // import namespace "mqtt"
const MQTT_AV1_TOPIC = "netherlands/breda/home/+/+";
const MQTT_OLD_TOPIC = "home/livingroom/#";
let client = mqtt.connect("mqtt://localhost:1883"); // create a client


client.on("connect", () => {
  client.subscribe(MQTT_OLD_TOPIC, (err) => {
    if (!err) {
    }
  });

});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(topic);
  console.log(message.toString());
  // client.end();
});
