/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import MockСitiesWithAirports from 'src/app/core/data/constants/MockСities';
import { City } from 'src/app/core/interfaces/City';

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss'],
})
export class FlightSearchFormComponent implements OnInit {
  form!: FormGroup;

  options: City[] = MockСitiesWithAirports;

  filteredOptionsFromWhere!: Observable<City[]>;

  filteredOptionsDestination!: Observable<City[]>;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.filteredOptionsFromWhere = this.form
      .get('fromWhere')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this.filter(value || ''))
      );

    this.filteredOptionsDestination = this.form
      .get('destination')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this.filter(value || ''))
      );
  }

  private createForm() {
    this.form = this.fb.group({
      typeOfFlights: 'round-trip',
      fromWhere: '',
      destination: '',
    });
  }

  displayFn(city: City): string {
    return city.city ? city.city : '';
  }

  private filter(value: string): City[] {
    if (typeof value === 'string') {
      return this.options.filter((option) =>
        option.city.toLowerCase().includes(value)
      );
    }
    return this.options;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }
}
