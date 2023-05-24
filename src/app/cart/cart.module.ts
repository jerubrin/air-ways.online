import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartRoutingModule } from './cart-routing.module';
import { SortTitleComponent } from './components/sort-title/sort-title.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { TotalPriceComponent } from './components/total-price/total-price.component';

@NgModule({
  declarations: [CartPageComponent, SortTitleComponent, CartItemComponent, TotalPriceComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    CartRoutingModule
  ],
})
export class CartModule {}
