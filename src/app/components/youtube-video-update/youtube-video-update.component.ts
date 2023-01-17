import { YoutubeVideo } from './../../models/entities/youtubeVideo';
import { YoutubeVideoService } from './../../services/youtube-video.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-youtube-video-update',
  templateUrl: './youtube-video-update.component.html',
  styleUrls: ['./youtube-video-update.component.css'],
})
export class YoutubeVideoUpdateComponent implements OnInit {
  artifact: ArtifactDetailsDto;
  youtubeVideoAddForm: FormGroup;
  checking = true;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private youtubeVideoService: YoutubeVideoService
  ) {}

  ngOnInit(): void {
    this.createYoutubeVideoAddForm();
    this.checkIfYoutubeVideoExist();
  }

  checkIfYoutubeVideoExist() {
    if (this.artifact.youtubeVideo) {
      this.youtubeVideoAddForm
        .get('link')
        ?.setValue(this.artifact.youtubeVideo.link);
    } else {
    }

  }

  createYoutubeVideoAddForm() {
    this.youtubeVideoAddForm = this.formBuilder.group({
      link: [''],
    });
  }

  close() {
    this.activeModal.close('Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Add Modal Dismissed');
  }

  modify() {
    if (this.artifact.youtubeVideo) {
      this.update();
    } else {
      this.add();
    }
  }

  update() {
    if (this.youtubeVideoAddForm.valid) {
      let youtubeVideoModel: YoutubeVideo = Object.assign(
        {},
        this.youtubeVideoAddForm.value
      );

      youtubeVideoModel.artifactId = this.artifact.artifact.id!;
      youtubeVideoModel.id = this.artifact.youtubeVideo.id;

      this.youtubeVideoService.update(youtubeVideoModel).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            this.getTranslate('successful')
          );
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
    }
  }

  add() {
    if (this.youtubeVideoAddForm.valid) {
      let youtubeVideoModel: YoutubeVideo = Object.assign(
        {},
        this.youtubeVideoAddForm.value
      );

      youtubeVideoModel.artifactId = this.artifact.artifact.id!;

      this.youtubeVideoService.add(youtubeVideoModel).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            this.getTranslate('successful')
          );
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
    }
  }

  deleteVideo() {
    if (this.youtubeVideoAddForm.valid) {
      let youtubeVideoModel: YoutubeVideo = Object.assign(
        {},
        this.youtubeVideoAddForm.value
      );

      youtubeVideoModel.artifactId = this.artifact.artifact.id!;

      this.youtubeVideoService.add(youtubeVideoModel).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            this.getTranslate('successful')
          );
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
    }
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
