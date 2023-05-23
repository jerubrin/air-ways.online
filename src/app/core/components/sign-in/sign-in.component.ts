import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
// import AuthAction from 'src/app/core/data/enams/AuthAction';
import Gender from 'src/app/core/data/enams/Gender';
import CountryCodes from 'src/app/shared/data/constants/CountryCodes';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  gender = Gender;

  genderValue: Gender = this.gender.Male;

  countryCodes = CountryCodes;

  firstCountryCode = this.countryCodes[0];

  constructor(public readonly authService: AuthService) {}
}
