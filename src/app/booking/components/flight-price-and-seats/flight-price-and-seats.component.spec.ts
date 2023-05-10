import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightPriceAndSeatsComponent } from './flight-price-and-seats.component';

describe('FlightPriceAndSeatsComponent', () => {
  let component: FlightPriceAndSeatsComponent;
  let fixture: ComponentFixture<FlightPriceAndSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightPriceAndSeatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightPriceAndSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
