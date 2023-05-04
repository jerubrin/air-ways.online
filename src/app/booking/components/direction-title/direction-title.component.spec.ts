import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionTitleComponent } from './direction-title.component';

describe('DirectionTitleComponent', () => {
  let component: DirectionTitleComponent;
  let fixture: ComponentFixture<DirectionTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectionTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
