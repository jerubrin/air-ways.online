import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, Subscription, tap } from 'rxjs';
import { FlightsApiService } from 'src/app/core/services/flights-api.service';
import { Airport } from '../../interfaces/airport.model';

@Component({
  selector: 'app-destination-form-field',
  templateUrl: './destination-form-field.component.html',
  styleUrls: ['./destination-form-field.component.scss']
})
export class DestinationFormFieldComponent implements OnInit, OnDestroy {
  @Input() initialValue!: string;

  @Input() label!: string;

  @Output() validValue = new EventEmitter<string>();

  options!: Airport[];

  destinationControl = new FormControl('', [Validators.required, Validators.minLength(2)]);

  isOptionSelected = false;

  private subscriptions: Subscription[] = [];

  constructor(private flightsApiService: FlightsApiService) {}

  ngOnInit(): void {
    if (this.initialValue) {
      this.destinationControl.setValue(this.initialValue);
      this.destinationControl.markAsTouched();
      this.emitValidValue(this.initialValue);
    } else {
      this.subscriptions.push(
        this.flightsApiService
          .getAirportStream('')
          .pipe(
            tap((airports) => {
              this.options = airports;
            })
          )
          .subscribe()
      );
    }

    this.subscriptions.push(
      this.destinationControl.valueChanges
        .pipe(
          debounceTime(300),
          tap(() => {
            const searchValue: string = this.destinationControl.value || '';

            if (searchValue.trim().length >= 2 || searchValue.trim().length === 0) {
              if (this.isOptionSelected) {
                this.emitValidValue(searchValue);
              }
              if (!this.isOptionSelected) {
                this.subscriptions.push(
                  this.flightsApiService
                    .getAirportStream(searchValue)
                    .pipe(
                      tap((airports) => {
                        if (airports.length === 0) {
                          const errors = { required: true, notFound: true };
                          this.destinationControl.setErrors(errors);
                        } else {
                          const errors = { required: true, notFound: false };
                          this.destinationControl.setErrors(errors);
                        }
                        this.options = airports;
                      })
                    )
                    .subscribe()
                );
              }
              this.isOptionSelected = false;
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onOptionSelected(option: Airport): void {
    this.isOptionSelected = true;

    this.destinationControl.setValue(`${option.city} ${option.key}`);

    this.options = [];
  }

  getDepartureFromErrorMessage(): string {
    if (this.destinationControl.hasError('notFound')) {
      return 'No airports found. Choose from the list';
    }
    if (this.destinationControl.hasError('required')) {
      return 'Please select from the list';
    }
    if (this.destinationControl.hasError('minlength')) {
      return 'Enter at least 2 characters';
    }
    return '';
  }

  emitValidValue(value: string): void {
    if (value !== null) {
      this.validValue.emit(value);
    }
  }
}
