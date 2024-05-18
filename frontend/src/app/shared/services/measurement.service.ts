import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { GetMeasurementsRequest } from "../models/get-measurements-request.interface";
import { Measurement } from "../models/measurement.interface";

const HA_API_URL: string = 'http://localhost:3001/measurements';

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
    const params = new HttpParams()
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
      HA_API_URL,
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
