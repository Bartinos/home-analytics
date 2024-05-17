import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { isLoggedInGuard } from './shared/guards/is-logged-in.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', canActivateChild: [isLoggedInGuard], children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'login', redirectTo: 'dashboard'},
    { path: 'dashboard', component: DashboardComponent}
  ]},
{ path: 'login', component: AuthComponent }
];
