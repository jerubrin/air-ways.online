import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFormatMenuComponent } from './date-format-menu.component';

describe('DateFormatMenuComponent', () => {
  let component: DateFormatMenuComponent;
  let fixture: ComponentFixture<DateFormatMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateFormatMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateFormatMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
