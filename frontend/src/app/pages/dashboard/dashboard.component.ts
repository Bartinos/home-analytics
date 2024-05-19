import { Component, OnInit, inject } from '@angular/core';
import { MeasurementService } from '../../shared/services/measurement.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth/auth.reducer';
import { MeasurementState, brightnessTopic, heaterTopic, temperatureTopic } from '../../state/measurements/measurement.reducer';
import { measurementActions } from '../../state/measurements/measurement.actions';
import { GetMeasurementsRequest } from '../../shared/models/get-measurements-request.interface';
import { selectBrightnessMeasurementCollection, selectHeaterMeasurementCollection, selectTemperatureMeasurementCollection } from '../../state/measurements/measurement.selectors';
import { map } from 'rxjs';
import { MeasurementDisplayComponent } from '../../components/measurement-display/measurement-display.component';
import { CommonModule } from '@angular/common';
import { Signal} from '@angular/core';
import { selectCurrentUser } from '../../state/auth/auth.selectors';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MeasurementDisplayComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor() {

  }
  private store = inject(Store<{ authState: AuthState, measurementState: MeasurementState }>);
  private measurementService = inject(MeasurementService);
  public user$ = this.store.select(selectCurrentUser);
  public temperatureCollection$ = this.store.select(selectTemperatureMeasurementCollection);
  public heaterCollection$ = this.store.select(selectHeaterMeasurementCollection);
  public brightnessCollection$ = this.store.select(selectBrightnessMeasurementCollection);

  ngOnInit() {
    // this.store.select(selectTemperatureMeasurementCollection).pipe(map((collection) => {
    this.fetchData()
  // length = computed(() => {
  //   return this.dataCollection().measurements.length
  // })
    this.user$.subscribe((value) => {
      console.log(value?.username)
    })
  }

  private fetchData(): void{
    this.store.dispatch(measurementActions.fetchTemperatureMeasurements({ request: { topic: temperatureTopic} }));
    this.store.dispatch(measurementActions.fetchHeaterMeasurements({ request: { topic: heaterTopic} }));
    this.store.dispatch(measurementActions.fetchBrightnessMeasurements({ request: { topic: brightnessTopic} }));

  }

  logout(): void {

  }
}
