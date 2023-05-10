import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Airport } from '../../interfaces/airport.model';
import { autocompleteObjectValidator } from '../../validators/autocompleteObjectValidator';

@Component({
  selector: 'app-destination-form-field',
  templateUrl: './destination-form-field.component.html',
  styleUrls: ['./destination-form-field.component.scss']
})
export class DestinationFormFieldComponent implements OnInit {
  @Input() initialValue = '';

  @Input() label = '';

  @Input() options!: Airport[];

  destinationControl!: FormControl;

  ngOnInit(): void {
    this.destinationControl = new FormControl(this.initialValue, [
      Validators.required,
      autocompleteObjectValidator(this.options)
    ]);
  }

  displayCityFn(city: Airport): string {
    return city.city ? `${city.city} ${city.key}` : '';
  }
}
