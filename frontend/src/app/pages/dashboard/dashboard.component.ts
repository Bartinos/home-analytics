import { Component, OnInit, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth/auth.reducer';
import { MeasurementState, brightnessTopic, heaterTopic, temperatureTopic } from '../../state/measurements/measurement.reducer';
import { measurementActions } from '../../state/measurements/measurement.actions';
import { selectBrightnessMeasurementCollection, selectHeaterMeasurementCollection, selectTemperatureMeasurementCollection } from '../../state/measurements/measurement.selectors';
import { interval, map, startWith, switchMap, take, tap } from 'rxjs';
import { MeasurementDisplayComponent } from '../../components/measurement-display/measurement-display.component';
import { CommonModule } from '@angular/common';
import { selectCurrentUser } from '../../state/auth/auth.selectors';
import { authActions } from '../../state/auth/auth.actions';
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
  public user$ = this.store.select(selectCurrentUser);
  public temperatureCollection$ = this.store.select(selectTemperatureMeasurementCollection);
  public heaterCollection$ = this.store.select(selectHeaterMeasurementCollection);
  public brightnessCollection$ = this.store.select(selectBrightnessMeasurementCollection);

  ngOnInit() {
    // Poll measurements
    interval(3000).pipe(
      startWith(0),
      tap(() => {
        return this.fetchData()
      })
    ).subscribe();
  }

  private fetchData(): void {

    this.temperatureCollection$.pipe(take(1)).subscribe(collection => {
      const topic  = collection.topic;
      const timeOfLastFetch = collection.timeOfLastFetch;
      this.store.dispatch(measurementActions.fetchTemperatureMeasurements({ request: { topic, since: timeOfLastFetch } }));
    })

    this.heaterCollection$.pipe(take(1)).subscribe(collection => {
      const topic  = collection.topic;
      const timeOfLastFetch = collection.timeOfLastFetch;
      this.store.dispatch(measurementActions.fetchHeaterMeasurements({ request: { topic, since: timeOfLastFetch } }));
    })

    this.brightnessCollection$.pipe(take(1)).subscribe(collection => {
      const topic  = collection.topic;
      const timeOfLastFetch = collection.timeOfLastFetch;
      this.store.dispatch(measurementActions.fetchBrightnessMeasurements({ request: { topic, since: timeOfLastFetch } }));
    })
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
