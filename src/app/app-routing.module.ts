import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductsComponent } from './components/products/products.component';
import { TestComponent } from './components/test/test.component';
import { ProductsPaymentComponent } from './components/products-payment/products-payment.component';
import { NissanMosesComponent } from './components/nissan-moses/nissan-moses.component';
import { AdminGuard } from 'services/admin.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin', canActivate: [AdminGuard], component: AdminComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products-payment', component: ProductsPaymentComponent },
  { path: 'test', component: TestComponent },
  { path: 'main', component: NissanMosesComponent },

  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
