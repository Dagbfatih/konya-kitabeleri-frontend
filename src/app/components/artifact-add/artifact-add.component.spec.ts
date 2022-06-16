import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactAddComponent } from './artifact-add.component';

describe('ArtifactAddComponent', () => {
  let component: ArtifactAddComponent;
  let fixture: ComponentFixture<ArtifactAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtifactAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
