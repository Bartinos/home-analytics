export class Av1Topic {
  
  

  readonly clientId: string;
  readonly namespace: string;
  readonly category: string;
  readonly subCategory1: string;
  readonly subCategory2: string;
  readonly country: string;
  readonly city: string;
  readonly building: string;
  readonly space: string;
  readonly sensor: string;

  constructor(clientId: string, namespace: string, category: string, subCategory1: string, subCategory2: string, country: string, city: string, building: string, space: string, sensor: string) {
    this.clientId = clientId;
    this.namespace = namespace;
    this.category = category;
    this.subCategory1 = subCategory1;
    this.subCategory2 = subCategory2;
    this.country = country;
    this.city = city;
    this.building = building;
    this.space = space;
    this.sensor = sensor;
  }

  static fromSimplifiedTopicString(topic: string): Av1Topic {
    const CLIENT_ID_INDEX: number = 0;
    const COUNTRY_INDEX: number = 1;
    const CITY_INDEX: number = 2;
    const BUILDING_INDEX: number = 3;
    const SPACE_INDEX: number = 4;
    const SENSOR_INDEX: number = 5;

    const splitTopic: string[] = topic.split("/");
    if (splitTopic.length != 6) return null;

    const clientId: string = splitTopic[CLIENT_ID_INDEX];
    const country: string = splitTopic[COUNTRY_INDEX];
    const city: string = splitTopic[CITY_INDEX];
    const building: string = splitTopic[BUILDING_INDEX];
    const space: string = splitTopic[SPACE_INDEX];
    const sensor: string = splitTopic[SENSOR_INDEX];
    
    const av1Topic: Av1Topic = new Av1Topic(
      clientId,
      "UD",
      "DATA",
      "UD",
      "UD",
      country,
      city,
      building,
      space,
      sensor
    )
    return av1Topic;
  }

  isMeasurementTopic(){
    if(this.category === "DATA") return true;
    return false;
  }
}
