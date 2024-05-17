import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../shared/models/login-request.interface';
import { authActions } from '../../state/auth/auth.actions';
import { Store } from '@ngrx/store';
import { selectIsSubmittingLogin } from '../../state/auth/auth.selectors';
import { CommonModule } from '@angular/common';
import { AuthState } from '../../state/auth/auth.reducer';
import { Observable } from 'rxjs';

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
  private store: Store<{authState: AuthState}> = inject(Store);
  // Form state
  // public mailErrorMessage: string = '';
  // errorMessage: string = '';
  isSubmitting$: Observable<boolean> = this.store.select(selectIsSubmittingLogin);

  constructor(private fb: FormBuilder) { }
  ngOnInit() {
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
