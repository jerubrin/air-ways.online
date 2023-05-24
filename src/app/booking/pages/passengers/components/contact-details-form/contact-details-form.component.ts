import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactDetails } from 'src/app/core/interfaces/contact-details';
import CountryCodes from 'src/app/shared/data/constants/CountryCode';
import { CountryCode } from 'src/app/shared/interfaces/country-code';

@Component({
  selector: 'app-contact-details-form',
  templateUrl: './contact-details-form.component.html',
  styleUrls: ['./contact-details-form.component.scss']
})
export class ContactDetailsFormComponent implements OnInit, OnDestroy {
  @Input() initialValues!: ContactDetails | null;

  @Output() contactDetailsFormChanges = new EventEmitter<{
    isValid: boolean;
    formValue: ContactDetails;
  }>();

  contactDetailsForm!: FormGroup;

  countryCodes: CountryCode[] = CountryCodes;

  selectedCountryCode!: string;

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.selectedCountryCode = this.initialValues?.countryCode || this.countryCodes[0].code;

    this.contactDetailsForm = this.formBuilder.group({
      countryCode: [this.selectedCountryCode, Validators.required],
      phone: [this.initialValues?.phone || '', Validators.required],
      email: [this.initialValues?.email || '', Validators.required]
    });
    this.subscriptions.push(
      this.contactDetailsForm.valueChanges.subscribe(() => {
        const { valid, value } = this.contactDetailsForm;
        const eventValue = { isValid: valid, formValue: value };
        this.contactDetailsFormChanges.emit(eventValue);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  getErrorMessage(fieldName: string): string {
    const fieldControl = this.contactDetailsForm?.get(fieldName);

    if (fieldControl?.hasError('required')) {
      return 'Enter data please';
    }
    // if (fieldControl?.hasError('pattern')) {
    //   return 'Invalid character';
    // }
    return '';
  }
}
