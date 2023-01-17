import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeVideoAddComponent } from './youtube-video-add.component';

describe('YoutubeVideoAddComponent', () => {
  let component: YoutubeVideoAddComponent;
  let fixture: ComponentFixture<YoutubeVideoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeVideoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeVideoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
