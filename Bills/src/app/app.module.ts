import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { CreateOrderComponent } from './order-detail/create-order/create-order.component';
import { OrderListComponent } from './order-detail/order-list/order-list.component';

//Import for NGS Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {ToastrModule, ToastrService} from 'ngx-toastr'
import {MatAutocompleteModule, MatAutocomplete} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';


//Reactive Form Module
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { OrderService } from './shared/order.service';
import { AuthService } from './shared/auth.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderSummaryComponent } from './order-detail/order-summary/order-summary.component';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { NavbarComponent } from './navbar/navbar.component';
import { InvoiceComponent } from './show-orders/invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateOrderComponent,
    OrderListComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    OrderDetailComponent,
    DashboardComponent,
    OrderSummaryComponent,
    ShowOrdersComponent,
    NavbarComponent,
    InvoiceComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,//required animation module
    ToastrModule.forRoot(), //Toastr Module added
    AppRoutingModule
  ],
  providers: [
    AngularFirestore,
    ToastrService,
    FormBuilder,
    OrderService,
    AuthService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
