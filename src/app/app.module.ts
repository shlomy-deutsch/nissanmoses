import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { DialogOverviewExampleDialog, HomeComponent } from './components/home/home.component';
import { AdminComponent, DialogOverviewExampleDialog1 } from './components/admin/admin.component';
import { OrderComponent } from './components/order/order.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule, MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS} from '@angular/material/button-toggle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { PaymentComponent } from './components/payment/payment.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import {MatTableModule} from '@angular/material/table';
import { TestComponent } from './components/test/test.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { ProductsPaymentComponent } from './components/products-payment/products-payment.component';
import { NissanMosesComponent } from './components/nissan-moses/nissan-moses.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRippleModule} from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    OrderComponent,
    DialogOverviewExampleDialog,
    ProductsComponent,
    PaymentComponent,
    TestComponent,
    ProductCardComponent,
    DialogOverviewExampleDialog1,
    ProductsPaymentComponent,
    NissanMosesComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatFormFieldModule,
    GooglePayButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    CarouselModule,
    MatBadgeModule,
    MatSidenavModule,
    MatRippleModule,
    MatCheckboxModule
  ],
  providers: [ { provide:MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS, useValue: { color: 'my-custom-color' }} ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
