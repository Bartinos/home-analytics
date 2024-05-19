import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { GetMeasurementsRequest } from "../models/get-measurements-request.interface";
import { Measurement } from "../models/measurement.interface";
import { environment } from "../../../environments/environment.prod";

const HA_API_URL: string = environment.haApiUrl;

const headers = new HttpHeaders({ 'Content-Type': 'application/json' })


@Injectable(
  {
    providedIn: 'root'
  }
)
export class MeasurementService {
  constructor() {

  }
  private http = inject(HttpClient)

  getMeasurements(data: GetMeasurementsRequest): Observable<Measurement[]> {
    // let params: HttpParams;

    // console.log(data.since?.getMilliseconds())
    let date;
    if (!data.since) {
      const sixHours: number = 21600;
      date = Math.floor((new Date().getTime() / 1000) - sixHours)
    } else {
      date = Math.floor(data.since.getTime() / 1000);
    }

    const params = new HttpParams().set('since', date)
        .set('country', data.topic.country)
        .set('city', data.topic.city)
        .set('building', data.topic.building)
        .set('space', data.topic.space)
        .set('sensor', data.topic.sensor)


    const options = {
      params: params,
      headers: headers
    }
    return this.http.get<Measurement[]>(
      HA_API_URL + 'measurements',
      options
    ).pipe(map((response: any[]) => {
      // map each item in the response to StockItem
      return response.map((item: any) => (<Measurement>{
        value: item.value,
        createdAt: new Date(item.created_at)
      }));
    }))
  }
}
