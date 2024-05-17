import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { isLoggedInGuard } from './shared/guards/is-logged-in.guard';

export const routes: Routes = [
    {path: '', canActivateChild: [isLoggedInGuard], children: [
    // { path: '', redirectTo: '/', pathMatch: 'full'}
  ]},
{ path: 'login', component: AuthComponent }
];
