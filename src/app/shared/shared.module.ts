import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PassengersFormFieldComponent } from './components/passengers-form-field/passengers-form-field.component';
import { MaterialModule } from './modules/material.module';
import { OrderByPipe } from './pipes/order-by.pipe';

import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { DatepickerRangeComponent } from './components/datepicker-range/datepicker-range.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DestinationFormFieldComponent } from './components/destination-form-field/destination-form-field.component';
import { SortTitleComponent } from './components/sort-title/sort-title.component';
import { AddSubtractHoursPipe } from './pipes/add-subtract-hours.pipe';
import { CartSortByPipe } from './pipes/cart-sort-by.pipe';
import { PricePipe } from './pipes/price.pipe';
import { SelectedCountPipe } from './pipes/selected-count.pipe';

@NgModule({
  declarations: [
    OrderByPipe,
    PassengersFormFieldComponent,
    DatepickerComponent,
    DatepickerRangeComponent,
    DestinationFormFieldComponent,
    AddSubtractHoursPipe,
    CartListComponent,
    SortTitleComponent,
    PricePipe,
    SelectedCountPipe,
    CartSortByPipe,
    CartItemComponent
  ],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    DatepickerComponent,
    DatepickerRangeComponent,
    DestinationFormFieldComponent,
    PassengersFormFieldComponent,
    OrderByPipe,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AddSubtractHoursPipe,
    CartListComponent,
    SortTitleComponent,
    PricePipe,
    SelectedCountPipe,
    CartSortByPipe,
    CartItemComponent
  ]
})
export class SharedModule {}
