import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDateCardsComponent } from './top-date-cards.component';

describe('TopDateCardsComponent', () => {
  let component: TopDateCardsComponent;
  let fixture: ComponentFixture<TopDateCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopDateCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopDateCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
