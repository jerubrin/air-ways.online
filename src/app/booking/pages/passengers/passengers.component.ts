import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { PassengersResultData } from 'src/app/shared/interfaces/passengers.model';

import { PassengersService } from '../../services/passengers.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit, OnDestroy {
  passengersForm!: FormGroup;

  // типизировать
  passengersResultData: PassengersResultData = {
    adults: [],
    children: [],
    infants: [],
    contactDetailsData: {
      firstName: '',
      lastName: ''
    }
  };

  passengers: { title: 'Adult' | 'Children' | 'Infant' }[] = [];

  isFormValid = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private passengersService: PassengersService,
    private queryParamsService: QueryParamsService,
    private stepperService: StepperService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((currentParams) => {
        this.setInitialValuesFromQueryParams(currentParams);
      })
    );
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private setInitialValuesFromQueryParams(params: any): void {
    const adultsCounts = params.adults ? Number(params.adults) : 1;
    const childrenCounts = params.children ? Number(params.children) : 0;
    const infantsCounts = params.infants ? Number(params.infants) : 0;

    this.passengers = [];
    for (let i = 0; i < adultsCounts; i += 1) {
      this.passengers.push({ title: 'Adult' });
    }
    for (let i = 0; i < childrenCounts; i += 1) {
      this.passengers.push({ title: 'Children' });
    }
    for (let i = 0; i < infantsCounts; i += 1) {
      this.passengers.push({ title: 'Infant' });
    }
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
    passengerFormValue: any,
    passengerTitle: 'Adult' | 'Children' | 'Infant'
  ): void {
    switch (passengerTitle) {
      case 'Adult':
        this.passengersResultData.adults.push(passengerFormValue);
        break;
      case 'Children':
        this.passengersResultData.children.push(passengerFormValue);
        break;
      case 'Infant':
        this.passengersResultData.infants.push(passengerFormValue);
        break;
      default:
        return;
    }

    this.checkFormValid();
  }

  updateContactDetailsForm(contactDetailsFormValue: any) {
    this.passengersResultData.contactDetailsData = contactDetailsFormValue;
    this.checkFormValid();
  }

  checkFormValid(): void {
    console.log(this.passengersResultData);

    const isPassengerFormsValid = this.validatePassengerForms();
    const isContactDetailsFormValid = this.validateContactDetailsForm();

    this.isFormValid = isPassengerFormsValid && isContactDetailsFormValid;
  }

  private validatePassengerForms(): boolean {
    const { adults, children, infants } = this.passengersResultData;

    const isAdultsValid =
      adults.length === this.passengers.filter((p) => p.title === 'Adult').length;
    const isChildrenValid =
      children.length === this.passengers.filter((p) => p.title === 'Children').length;
    const isInfantsValid =
      infants.length === this.passengers.filter((p) => p.title === 'Infant').length;

    return isAdultsValid && isChildrenValid && isInfantsValid;
  }

  private validateContactDetailsForm(): boolean {
    const { contactDetailsData } = this.passengersResultData;
    return !!contactDetailsData && Object.keys(contactDetailsData).length > 0;
  }

  goBack(): void {
    const queryParams = this.queryParamsService.getQueryParams();
    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPageFlights}`], {
      queryParams
    });
    this.stepperService.previous();
  }

  onSubmit(): void {
    if (this.isFormValid) {
      console.log(this.passengersResultData);
    } else {
      // Handle invalid form
      console.log('Invalid form');
      // Show an error message or perform any required action
    }
  }
}
