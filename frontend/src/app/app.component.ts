import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PersistanceService } from './shared/services/persistance.service';
import { Store } from '@ngrx/store';
import { MeasurementState } from './state/measurements/measurement.reducer';
import { AuthState } from './state/auth/auth.reducer';
import { authActions } from './state/auth/auth.actions';
import { CurrentUser } from './shared/models/current-user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  private persistanceService = inject(PersistanceService);
  private store: Store<{ authState: AuthState, measurementState: MeasurementState }> = inject(Store);
  constructor() {
    this.initUserIfExists()
  }

  private initUserIfExists(): void {
    // If session present
    const accessToken = this.persistanceService.get('refreshToken');
    const refreshToken = this.persistanceService.get('accessToken');

    if (accessToken && refreshToken) {
      console.log("Initializing user from localStorage")
      const username: string = (JSON.parse(atob(String(accessToken).split('.')[1]))).username;
      const currentUser: CurrentUser = {
        username,
        accessToken: String(accessToken),
        refreshToken: String(refreshToken)
      }
      // console.log(currentUser);
      this.store.dispatch(authActions.initUser({currentUser}))
    }
  }
}
