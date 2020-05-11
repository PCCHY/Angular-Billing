import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

// Import all the components for which navigation service has to be activated
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShowOrdersComponent } from './show-orders/show-orders.component';

//Import canActivate guard services
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { AuthGuard } from './shared/guard/auth.guard';


//Include route guard in routes array
const routes: Routes = [
  {path: '',redirectTo: '/order-detail',pathMatch:'full'},
  {path: 'order-detail', component: OrderDetailComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate:[SecureInnerPagesGuard]},
  {path: 'register', component: RegisterComponent, canActivate:[SecureInnerPagesGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent,canActivate:[SecureInnerPagesGuard]},
  {path: 'verify-email',component:VerifyEmailComponent, canActivate:[SecureInnerPagesGuard]},
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path: 'show-orders', component:ShowOrdersComponent, canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
