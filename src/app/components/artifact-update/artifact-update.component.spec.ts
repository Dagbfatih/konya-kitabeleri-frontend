import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactUpdateComponent } from './artifact-update.component';

describe('ArtifactUpdateComponent', () => {
  let component: ArtifactUpdateComponent;
  let fixture: ComponentFixture<ArtifactUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtifactUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
