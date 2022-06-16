import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalPeriodComponent } from './historical-period.component';

describe('HistoricalPeriodComponent', () => {
  let component: HistoricalPeriodComponent;
  let fixture: ComponentFixture<HistoricalPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
