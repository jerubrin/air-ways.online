import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactDetails } from 'src/app/core/interfaces/contact-details';
import { Gender, PassengersData } from 'src/app/core/interfaces/passengers-data';
import { PassengersResultData } from 'src/app/core/interfaces/passengers-result-data';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit, OnDestroy {
  passengersForm!: FormGroup;

  isFormValid = false;

  passengers: {
    title: 'Adult' | 'Children' | 'Infant';
    initialValues: PassengersData | null;
    isValid: boolean;
  }[] = [];

  contactDetailsInitialValue!: ContactDetails | null;

  private passengersResultData!: PassengersResultData;

  private adultsCounts!: number;

  private childrenCounts!: number;

  private infantsCounts!: number;

  private contactDetailsFormIsValid = false;

  private subscriptions: Subscription[] = [];

  private initialDataFromUser: ContactDetails | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private queryParamsService: QueryParamsService,
    private stepperService: StepperService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public mainStoreService: MainStoreService
  ) {}

  ngOnInit() {
    if (this.authService.userData) {
      this.initialDataFromUser = {
        phone: this.authService.userData.phone ?? '',
        email: this.authService.userData.email,
        countryCode: this.authService.userData.countryCode ?? ''
      };
    }
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((currentParams) => {
        this.getCurrentPassengersCountsFromQueryParams(currentParams);
        this.setInitialValues();
      })
    );
    this.initializeForm();
    this.checkFormValid();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private getCurrentPassengersCountsFromQueryParams(params: any): void {
    this.adultsCounts = params.adults ? Number(params.adults) : 1;
    this.childrenCounts = params.children ? Number(params.children) : 0;
    this.infantsCounts = params.infants ? Number(params.infants) : 0;
  }

  private getFirstPassenger(passengerData: PassengersData | null, i: number): PassengersData {
    if (
      passengerData &&
      (passengerData.firstName
        && passengerData.lastName
        && passengerData.gender
        && passengerData.lastName)
    ) {
      return passengerData;
    }
    const { gender, firstName, lastName, dateOfBirth } = this.authService.userData;
    // eslint-disable-next-line no-nested-ternary
    const genderData = gender === Gender.Male
      ? Gender.Male
      : (gender === Gender.Female ? Gender.Female : undefined);
    return {
      id: i,
      gender: genderData,
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      dateOfBirth: dateOfBirth ?? '',
      specialAssistance: false,
      checkedInBaggage: false,
    };
  }

  private setInitialValues(): void {
    this.passengersResultData = {
      ...this.mainStoreService.passengersResult,
      adults: this.mainStoreService.passengersResult.adults?.slice(0, this.adultsCounts) || [],
      children:
        this.mainStoreService.passengersResult.children?.slice(0, this.childrenCounts) || [],
      infants: this.mainStoreService.passengersResult.infants?.slice(0, this.infantsCounts) || []
    };

    this.passengers = [];
    const { adults, children, infants } = this.passengersResultData;

    for (let i = 0; i < this.adultsCounts; i += 1) {
      let passengerData = adults?.[i] || null;
      if (i === 0) {
        passengerData = this.getFirstPassenger(passengerData, i);
      }
      const isValid = !!passengerData
        && !!passengerData.firstName
        && !!passengerData.lastName
        && !!passengerData.gender
        && !!passengerData.dateOfBirth;
      this.passengers.push({
        title: 'Adult',
        initialValues: { ...passengerData, id: i },
        isValid
      });
      if (i === 0) {
        this.updatePassengerForms(isValid, 0, passengerData, 'Adult');
      }
    }

    for (let i = 0; i < this.childrenCounts; i += 1) {
      const passengerData = children?.[i] || null;
      const isValid = !!passengerData;
      this.passengers.push({
        title: 'Children',
        initialValues: { ...passengerData, id: i },
        isValid
      });
    }
    for (let i = 0; i < this.infantsCounts; i += 1) {
      const passengerData = infants?.[i] || null;
      const isValid = !!passengerData;
      this.passengers.push({
        title: 'Infant',
        initialValues: { ...passengerData, id: i },
        isValid
      });
    }

    this.contactDetailsInitialValue = this.passengersResultData.contactDetailsData || null;

    if (this.initialDataFromUser) {
      const { countryCode, email, phone } = this.contactDetailsInitialValue;
      if (countryCode === '' && email === '' && phone === '') {
        this.contactDetailsInitialValue = this.initialDataFromUser;
      }
    }

    this.contactDetailsFormIsValid = Object.values(this.contactDetailsInitialValue).every(
      (value) => value.trim() !== ''
    );
  }

  private initializeForm(): void {
    this.passengersForm = this.formBuilder.group({});
    for (let i = 0; i < this.passengers.length; i += 1) {
      const passengerFormGroupName = `passenger${i + 1}`;
      this.passengersForm.addControl(passengerFormGroupName, this.formBuilder.group({}));
    }
    this.passengersForm.addControl('contactDetails', this.formBuilder.group({}));
  }

  hasPassengers(): boolean {
    return this.passengers.length > 0;
  }

  updatePassengerForms(
    isValid: boolean,
    passengerIndex: number,
    formValue: PassengersData,
    passengerTitle: 'Adult' | 'Children' | 'Infant'
  ): void {
    this.passengers[passengerIndex].isValid = isValid;

    if (isValid) {
      let passengersList: PassengersData[];

      switch (passengerTitle) {
        case 'Adult':
          passengersList = this.passengersResultData.adults;
          break;
        case 'Children':
          passengersList = this.passengersResultData.children;
          break;
        case 'Infant':
          passengersList = this.passengersResultData.infants;
          break;
        default:
          return;
      }

      const passengerToUpdate = passengersList.find((passenger) => passenger.id === formValue.id);

      if (passengerToUpdate) {
        Object.assign(passengerToUpdate, formValue);
      } else {
        passengersList.push(formValue);
      }
    }

    this.checkFormValid();
  }

  updateContactDetailsForm(isValid: boolean, formValue: ContactDetails) {
    this.contactDetailsFormIsValid = isValid;
    if (isValid) {
      this.passengersResultData.contactDetailsData = formValue;
    }
    this.checkFormValid();
  }

  checkFormValid(): void {
    this.isFormValid =
      this.passengers.every((passenger) => passenger.isValid) && this.contactDetailsFormIsValid;
  }

  goBack(): void {
    const queryParams = this.queryParamsService.getQueryParams();
    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPageFlights}`], {
      queryParams
    });
    this.stepperService.previous();
  }

  onSubmit(): void {
    if (!this.isFormValid) {
      return;
    }

    this.mainStoreService.passengersResult = this.passengersResultData;

    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPageReviewPayment}`], {
      queryParamsHandling: 'merge'
    });

    this.stepperService.next();
  }
}
