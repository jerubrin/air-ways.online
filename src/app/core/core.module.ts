import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { CurrencyMenuComponent } from './components/header/components/currency-menu/currency-menu.component';
import { DateFormatMenuComponent } from './components/header/components/date-format-menu/date-format-menu.component';
import { LogoComponent } from './components/header/components/logo/logo.component';
import { ShoppingCartButtonComponent } from './components/header/components/shopping-cart-button/shopping-cart-button.component';
import { SignInButtonComponent } from './components/header/components/sign-in-button/sign-in-button.component';
import { StepperComponent } from './components/header/components/stepper/stepper.component';
import { HeaderComponent } from './components/header/header.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { NotFoundPageComponent } from './page/not-found-page/not-found-page.component';
import { MatBadgeHiddenPipe } from './pipes/mat-badge-hidden.pipe';
import { PricePipe } from './pipes/price.pipe';

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
    MessageDialogComponent,
    PricePipe,
    MatBadgeHiddenPipe,
  ],
  imports: [CommonModule, SharedModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent, PricePipe]
})
export class CoreModule {}
