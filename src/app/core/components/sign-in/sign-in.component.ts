import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import AuthAction from 'src/app/core/interfaces/auth-action';
import { Gender } from 'src/app/core/interfaces/passengers-data';
import { AuthService } from 'src/app/core/services/auth.service';
import CountryCodes from 'src/app/shared/data/constants/CountryCode';
import { CountryCode } from 'src/app/shared/interfaces/country-code';
import dateOfBirthValidator from 'src/app/shared/validators/dateOfBirthValidator';
import { SignUp } from '../../models/sign-up';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  authAction = AuthAction;

  Gender = Gender;

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
          this.signInFormChanges(this.signInForm.valid);
        }
      })
    );
    // Sign Up
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', [Validators.required, dateOfBirthValidator]],
      gender: ['', [Validators.required]],
      countryCode: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      citizenship: ['', Validators.required],
      agree: ['', [Validators.required, Validators.requiredTrue]]
    });
    this.subscriptions.push(
      this.signUpForm.valueChanges.subscribe(() => {
        if (this.signUpForm) {
          this.signUpFormChanges(this.signUpForm.valid);
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
    if (fieldControl?.hasError('pattern')) {
      return 'Invalid character';
    }
    if (fieldControl?.hasError('dateOfBirthInvalid')) {
      return 'Date of birth cannot be later than today';
    }
    return '';
  }

  signUpFormChanges(isValid: boolean) {
    this.isSignUpValid = isValid;
  }

  signInFormChanges(isValid: boolean) {
    this.isLoginValid = isValid;
  }

  loginSubmit() {
    if (!this.isLoginValid) {
      return;
    }
    this.authService.login(this.signInForm?.value);
  }

  signUpSubmit() {
    this.signUpForm?.get('gender')?.markAsTouched();
    this.signUpForm?.get('gender')?.updateValueAndValidity();
    this.signUpForm?.get('agree')?.markAsTouched();
    this.signUpForm?.get('agree')?.updateValueAndValidity();

    if (!this.isSignUpValid) {
      return;
    }

    const signUp = this.signUpForm?.value as Partial<SignUp>;

    this.authService.signUp({
      email: signUp.email ?? '',
      password: signUp.password ?? '',
      firstName: signUp.firstName ?? '',
      lastName: signUp.lastName ?? '',
      dateOfBirth: signUp.dateOfBirth ?? '',
      gender: signUp.gender ?? '',
      phone: signUp.phone ?? '',
      countryCode: signUp.countryCode?.code ?? '',
      citizenship: signUp.citizenship?.name ?? '',
    });
  }
}
