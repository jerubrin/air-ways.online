import { Component } from '@angular/core';
import AuthAction from 'src/app/core/interfaces/auth-action';
import { Gender } from 'src/app/core/interfaces/passengers-data';
import { AuthService } from 'src/app/core/services/auth.service';
import CountryCodes from 'src/app/shared/data/constants/CountryCode';
import { UserLogin } from '../../interfaces/user-login.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  authAction = AuthAction;

  userLogin: UserLogin = {
    email: '',
    password: '',
  };

  fromSignup = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: Gender.Male,
    countryCode: CountryCodes[0],
    phone: '',
    citizenship: CountryCodes[0],
  };

  authActionValue: AuthAction = this.authAction.Login;

  CountryCodes = CountryCodes;

  Gender = Gender;

  constructor(public readonly authService: AuthService) {}

  register() {
    // console.log(this.fromSignup);
    // this.authService.signUp()
  }
}
