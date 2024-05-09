export class Av1Topic {
  constructor() {
  }

  static fromTopicString(topic: string): Av1Topic {
    return new Av1Topic();
  }

  isMeasurementTopic(){
    return true;
  }
}
