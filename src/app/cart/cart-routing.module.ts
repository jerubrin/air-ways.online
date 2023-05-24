import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';

const routes: Routes = [
  { path: '', component: CartPageComponent },
  { path: 'payment', component: PaymentPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
