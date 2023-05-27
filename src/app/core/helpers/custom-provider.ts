import { BaseLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../data/enams/local-storage.enum';

@Injectable({ providedIn: 'root' })
export class CustomLoginProvider extends BaseLoginProvider {
  autoLogin = false;

  isAuth = false;

  constructor() {
    super();
    this.isAuth = !!localStorage.getItem(LocalStorageKeys.Token);
  }

  override initialize(autoLogin?: boolean): Promise<void> {
    this.autoLogin = autoLogin;
    return Promise.resolve();
  }

  override getLoginStatus(): Promise<SocialUser> {
    return Promise.resolve(
      JSON.parse(localStorage.getItem(LocalStorageKeys.UserData))
    );
  }

  override signIn(): Promise<SocialUser> {
    return Promise.resolve(
      JSON.parse(localStorage.getItem(LocalStorageKeys.UserData))
    );
  }

  override signOut(): Promise<void> {
    return Promise.resolve();
  }

  public static readonly PROVIDER_ID = 'CUSTOM' as const;
}
