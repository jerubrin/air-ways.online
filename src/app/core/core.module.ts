import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencyMenuComponent } from './components/header/components/currency-menu/currency-menu.component';
import { DateFormatMenuComponent } from './components/header/components/date-format-menu/date-format-menu.component';
import { LogoComponent } from './components/header/components/logo/logo.component';
import { ShoppingCartButtonComponent } from './components/header/components/shopping-cart-button/shopping-cart-button.component';
import { SignInButtonComponent } from './components/header/components/sign-in-button/sign-in-button.component';
import { StepperComponent } from './components/header/components/stepper/stepper.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './modules/material.module';
import { NotFoundPageComponent } from './page/not-found-page/not-found-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SecondMenuComponent } from './components/second-menu/second-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    StepperComponent,
    DateFormatMenuComponent,
    CurrencyMenuComponent,
    SignInButtonComponent,
    ShoppingCartButtonComponent,
    NotFoundPageComponent,
    FooterComponent,
    OrderByPipe,
    SecondMenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    OrderByPipe,
    SecondMenuComponent,
  ],
})
export class CoreModule {}
