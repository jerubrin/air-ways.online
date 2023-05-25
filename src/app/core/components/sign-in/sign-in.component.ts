import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import AuthAction from 'src/app/core/interfaces/auth-action';
import { Gender } from 'src/app/core/interfaces/passengers-data';
import { AuthService } from 'src/app/core/services/auth.service';
import CountryCodes from 'src/app/shared/data/constants/CountryCode';
import { CountryCode } from 'src/app/shared/interfaces/country-code';
import { SignUp } from '../../models/sign-up';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  authAction = AuthAction;

  gender = Gender;

  genderValue: Gender = this.gender.Male;

  countryCodes: CountryCode[] = CountryCodes;

  firstCountryCode = this.countryCodes[0];

  signUpForm?: FormGroup;

  signInForm?: FormGroup;

  private subscriptions: Subscription[] = [];

  today: Date = new Date();

  isLoginValid = false;

  isSignUpValid = false;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.authService.authActionValue = AuthAction.Login;
  }

  ngOnInit(): void {
    // Sign In
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.subscriptions.push(
      this.signInForm.valueChanges.subscribe(() => {
        if (this.signInForm) {
          const { valid, value } = this.signInForm;
          const eventValue = { isValid: valid, formValue: value };
          this.signInFormChanges(eventValue);
        }
      })
    );
    // Sign Up
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      countryCode: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      citizenship: ['', Validators.required],
      agree: [false, Validators.required]
    });
    this.subscriptions.push(
      this.signUpForm.valueChanges.subscribe(() => {
        if (this.signUpForm) {
          const { valid, value } = this.signUpForm;
          const eventValue = { isValid: valid, formValue: value };
          this.signUpFormChanges(eventValue);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  getErrorMessage(fieldName: string): string {
    const fieldControl = this.signUpForm?.get(fieldName);

    if (fieldControl?.hasError('required')) {
      return 'Enter data please';
    }
    if (fieldControl?.hasError('pattern')) {
      return 'Invalid character';
    }
    if (fieldControl?.hasError('minlength')) {
      return 'Must be at least three digits';
    }
    if (fieldControl?.hasError('email')) {
      return 'The email is invalid';
    }
    return '';
  }

  signUpFormChanges({ isValid, formValue }: {
    isValid: boolean,
    formValue: SignUp,
  }) {
    this.isSignUpValid = isValid;
    console.log(isValid, formValue);
  }

  signInFormChanges({ isValid, formValue }: {
    isValid: boolean,
    formValue: SignUp,
  }) {
    this.isLoginValid = isValid;
    console.log(isValid, formValue);
  }

  loginSubmit() {
    if (!this.isLoginValid) {
      return;
    }
    alert('Login!');
  }

  signUpSubmit() {
    if (!this.isSignUpValid) {
      return;
    }
    alert('Sign up!');
  }
}
