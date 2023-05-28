import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CardItemComponent } from './components/card-item/card-item.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { PromoAndPayComponent } from './components/promo-and-pay/promo-and-pay.component';
import { TotalPriceComponent } from './components/total-price/total-price.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';

@NgModule({
  declarations: [
    CartPageComponent,
    TotalPriceComponent,
    PromoAndPayComponent,
    PaymentPageComponent,
    CardItemComponent,
    PreloaderComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    CartRoutingModule
  ],
})
export class CartModule {}
