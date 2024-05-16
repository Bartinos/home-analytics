import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/loginRequest.interface';
import { loginUser } from '../../state/user/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  public loginForm!: FormGroup;
  private router = inject(Router);
  private store = inject(Store);
  // Form state
  public mailErrorMessage: string = '';
  errorMessage: string = '';
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
    this.store.dispatch(loginUser({request}));
  }
}
