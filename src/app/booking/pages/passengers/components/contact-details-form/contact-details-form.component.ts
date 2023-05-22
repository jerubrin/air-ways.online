import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-details-form',
  templateUrl: './contact-details-form.component.html',
  styleUrls: ['./contact-details-form.component.scss']
})
export class ContactDetailsFormComponent implements OnInit, OnDestroy {
  @Output() contactDetailsFormChanges: EventEmitter<any> = new EventEmitter<any>();

  contactDetailsForm!: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.subscriptions.push(
      this.contactDetailsForm.valueChanges.subscribe((formValue) => {
        if (this.contactDetailsForm.valid) {
          this.contactDetailsFormChanges.emit(formValue);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
