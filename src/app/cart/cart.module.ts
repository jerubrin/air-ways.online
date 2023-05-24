import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { PromoAndPayComponent } from './components/promo-and-pay/promo-and-pay.component';
import { SortTitleComponent } from './components/sort-title/sort-title.component';
import { TotalPriceComponent } from './components/total-price/total-price.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartSortByPipe } from './pipes/cart-sort-by.pipe';
import { SelectedCountPipe } from './pipes/selected-count.pipe';

@NgModule({
  declarations: [
    CartPageComponent,
    SortTitleComponent,
    CartItemComponent,
    TotalPriceComponent,
    PromoAndPayComponent,
    SelectedCountPipe,
    CartSortByPipe
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    CartRoutingModule
  ],
})
export class CartModule {}
