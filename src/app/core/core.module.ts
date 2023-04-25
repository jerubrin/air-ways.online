import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import MaterialModule from './modules/material.module';
import HeaderComponent from './components/header/header.component';
import LogoComponent from './components/header/components/logo/logo.component';
import StepperComponent from './components/header/components/stepper/stepper.component';
import DateFormatMenuComponent from './components/header/components/date-format-menu/date-format-menu.component';
import CurrencyMenuComponent from './components/header/components/currency-menu/currency-menu.component';
import SignInButtonComponent from './components/header/components/sign-in-button/sign-in-button.component';
import { ShoppingCartButtonComponent } from './components/header/components/shopping-cart-button/shopping-cart-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    StepperComponent,
    DateFormatMenuComponent,
    CurrencyMenuComponent,
    SignInButtonComponent,
    ShoppingCartButtonComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, HeaderComponent],
})
export default class CoreModule {}
