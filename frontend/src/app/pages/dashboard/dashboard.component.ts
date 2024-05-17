import { Component, OnInit, inject } from '@angular/core';
import { MeasurementService } from '../../shared/services/measurement.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth/auth.reducer';
import { MeasurementState, brightnessTopic, heaterTopic, temperatureTopic } from '../../state/measurements/measurement.reducer';
import { measurementActions } from '../../state/measurements/measurement.actions';
import { GetMeasurementsRequest } from '../../shared/models/get-measurements-request.interface';
import { selectTemperatureMeasurementCollection } from '../../state/measurements/measurement.selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor() {

  }
  private store = inject(Store<{ authState: AuthState, measurementState: MeasurementState }>);
  private measurementService = inject(MeasurementService)
  ngOnInit() {
    // this.store.select(selectTemperatureMeasurementCollection).pipe(map((collection) => {
    this.fetchData()
  }

  private fetchData(): void{
    this.store.dispatch(measurementActions.fetchTemperatureMeasurements({ request: { topic: temperatureTopic} }));
    this.store.dispatch(measurementActions.fetchHeaterMeasurements({ request: { topic: heaterTopic} }));
    this.store.dispatch(measurementActions.fetchBrightnessMeasurements({ request: { topic: brightnessTopic} }));



  }
}
