import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../shared/models/login-request.interface';
import { authActions } from '../../state/auth/auth.actions';
import { Store } from '@ngrx/store';
import { selectIsSubmittingLogin, selectValidationErrors } from '../../state/auth/auth.selectors';
import { CommonModule } from '@angular/common';
import { AuthState } from '../../state/auth/auth.reducer';
import { Observable, combineLatest } from 'rxjs';
import { PersistanceService } from '../../shared/services/persistance.service';
import { MeasurementState } from '../../state/measurements/measurement.reducer';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  public loginForm!: FormGroup;
  private router = inject(Router);
  private store: Store<{ authState: AuthState, measurementState: MeasurementState }> = inject(Store);
  private persistanceService = inject(PersistanceService);
  // Form state
  // public mailErrorMessage: string = '';
  // errorMessage: string = '';
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmittingLogin),
    errors: this.store.select(selectValidationErrors)
  })
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    // Navigate to dashboard if already logged in
    if (this.persistanceService.get('refreshToken') && this.persistanceService.get('accessToken')) this.router.navigateByUrl('dashboard');

    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required
      ]]
    })


  }

  // Send Login form
  public onSubmit() {
    const request: LoginRequest = this.loginForm.getRawValue();
    this.store.dispatch(authActions.login({ request }));
  }
}
