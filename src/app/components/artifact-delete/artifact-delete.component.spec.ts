import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactDeleteComponent } from './artifact-delete.component';

describe('ArtifactDeleteComponent', () => {
  let component: ArtifactDeleteComponent;
  let fixture: ComponentFixture<ArtifactDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtifactDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
