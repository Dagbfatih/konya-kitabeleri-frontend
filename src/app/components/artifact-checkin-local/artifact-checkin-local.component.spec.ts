import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactCheckinLocalComponent } from './artifact-checkin-local.component';

describe('ArtifactCheckinLocalComponent', () => {
  let component: ArtifactCheckinLocalComponent;
  let fixture: ComponentFixture<ArtifactCheckinLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtifactCheckinLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactCheckinLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
