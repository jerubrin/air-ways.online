import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import MockAirports from '../../data/constants/MockAirports';
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

  options: Airport[] = MockAirports;

  filteredOptions!: Observable<Airport[]>;

  destinationControl!: FormControl;

  ngOnInit(): void {
    this.destinationControl = new FormControl(this.initialValue, [
      Validators.required,
      autocompleteObjectValidator(this.options)
    ]);

    this.filteredOptions = this.destinationControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this.filterCities(value || ''))
    );
  }

  private filterCities(value: string): Airport[] {
    if (typeof value === 'string') {
      return this.options.filter((opt) => opt.city.toLowerCase().includes(value.toLowerCase()));
    }
    return this.options;
  }

  displayCityFn(city: Airport): string {
    return city.city ? `${city.city} ${city.key}` : '';
  }
}
