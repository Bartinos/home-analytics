import { Component, OnInit, inject } from '@angular/core';
import { MeasurementService } from '../../shared/services/measurement.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth/auth.reducer';
import { MeasurementState } from '../../state/measurements/measurement.reducer';
import { measurementActions } from '../../state/measurements/measurement.actions';
import { GetMeasurementsRequest } from '../../shared/models/get-measurements-request.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
constructor()  {

}
  private store = inject(Store<{authState: AuthState, measurementState: MeasurementState}>);
  private measurementService = inject(MeasurementService)
  ngOnInit() {

    // this.measurementService.getMeasurements({
    //   topic: {
    //     country: "netherlands",
    //     city: "breda",
    //     building: "home",
    //     space: "livingroom",
    //     sensor: "brightness"
    //   }
    // }).subscribe(a => {
    //
    //     console.log(a)
    //   });
    const request: GetMeasurementsRequest = {
      topic: {
        country: "netherlands",
        city: "breda",
        building: "home",
        space: "stairs",
        sensor: "temperature"
      }
    }
    this.store.dispatch(measurementActions.fetchTemperatureMeasurements({request}));
  }
}
