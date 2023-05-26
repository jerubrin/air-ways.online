import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from '@abacritt/angularx-social-login';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GOOGLE_AUTH_CLIENT_ID, FACEBOOK_AUTH_CLIENT_ID } from 'env';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './core/components/sign-in/sign-in.component';
import { CoreModule } from './core/core.module';
import { metaReducers, reducers } from './redux';
import { SharedModule } from './shared/shared.module';

const SocialOauthProvider = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(GOOGLE_AUTH_CLIENT_ID)
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(FACEBOOK_AUTH_CLIENT_ID)
      }
    ],
    onError: (err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  } as SocialAuthServiceConfig
};

@NgModule({
  declarations: [SignInComponent, AppComponent],
  providers: [SocialOauthProvider],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    SocialLoginModule
  ],
  exports: [SignInComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
