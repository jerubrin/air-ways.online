import { Component } from '@angular/core';
import AuthAction from 'src/app/core/interfaces/auth-action';
import { Gender } from 'src/app/core/interfaces/passengers-data';
import { AuthService } from 'src/app/core/services/auth.service';
import CountryCodes from 'src/app/shared/data/constants/CountryCode';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  authAction = AuthAction;

  gender = Gender;

  genderValue: Gender = this.gender.Male;

  countryCodes = CountryCodes;

  firstCountryCode = this.countryCodes[0];

  constructor(public authService: AuthService) {
    this.authService.authActionValue = AuthAction.Login;
  }
}
