import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactTypeComponent } from './artifact-type.component';

describe('ArtifactTypeComponent', () => {
  let component: ArtifactTypeComponent;
  let fixture: ComponentFixture<ArtifactTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtifactTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
