import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBlockComponent } from './flight-block.component';

describe('FlightBlockComponent', () => {
  let component: FlightBlockComponent;
  let fixture: ComponentFixture<FlightBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightBlockComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FlightBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
