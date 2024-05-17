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
    const params = new HttpParams();
    params.set('country', data.topic.country);
    params.set('city', data.topic.city);
    params.set('building', data.topic.building);
    params.set('space', data.topic.space);
    params.set('sensor', data.topic.sensor);

    const options = {
      params: params,
      headers: headers
    }
    return this.http.get<Measurement[]>(
      HA_API_URL,
      options
    ).pipe(map((response) => response)
    )
  }

}
