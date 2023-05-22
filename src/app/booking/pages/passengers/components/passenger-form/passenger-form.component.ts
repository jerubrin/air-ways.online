import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.scss']
})
export class PassengerFormComponent implements OnInit, OnDestroy {
  @Input() passengerTitle!: 'Adult' | 'Children' | 'Infant';

  @Input() passengerIndex!: number;

  @Output() passengerFormChanges: EventEmitter<{
    formValue: any;
    passengerTitle: 'Adult' | 'Children' | 'Infant';
  }> = new EventEmitter<{ formValue: any; passengerTitle: 'Adult' | 'Children' | 'Infant' }>();

  passengerForm!: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.passengerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.subscriptions.push(
      this.passengerForm.valueChanges.subscribe((formValue) => {
        if (this.passengerForm.valid) {
          const eventValue = { formValue, passengerTitle: this.passengerTitle };
          this.passengerFormChanges.emit(eventValue);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
