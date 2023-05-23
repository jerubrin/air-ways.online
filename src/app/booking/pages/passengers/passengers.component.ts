import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactDetails } from 'src/app/core/interfaces/contact-details';
import { PassengersData } from 'src/app/core/interfaces/passengers-data';
import { PassengersResultData } from 'src/app/core/interfaces/passengers-result-data';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

import { PassengersService } from '../../services/passengers.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private passengersService: PassengersService,
    private queryParamsService: QueryParamsService,
    private stepperService: StepperService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public mainStoreService: MainStoreService
  ) {}

  ngOnInit() {
    console.log(this.mainStoreService.passengersResult);

    this.passengersResultData = this.mainStoreService.passengersResult;

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

  private setInitialValues(): void {
    this.passengers = [];
    const { adults, children, infants } = this.passengersResultData;

    for (let i = 0; i < this.adultsCounts; i += 1) {
      const passengerData = adults?.[i] || null;
      const isValid = !!passengerData;
      this.passengers.push({
        title: 'Adult',
        initialValues: { ...passengerData, id: i },
        isValid
      });
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
