import { YoutubeVideoUpdateComponent } from './../youtube-video-update/youtube-video-update.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ArtifactUpdateService } from './../../services/artifact-update.service';
import { ArtifactUpdateComponent } from './../artifact-update/artifact-update.component';
import { ArtifactDeleteComponent } from './../artifact-delete/artifact-delete.component';
import { Router } from '@angular/router';
import { ArtifactDetailsDto } from './../../models/dtos/artifactDetailsDto';
import { ArtifactAddComponent } from './../artifact-add/artifact-add.component';
import { ArtifactService } from './../../services/artifact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Artifact } from './../../models/entities/artifact';
import { Component, OnInit } from '@angular/core';
import {
  faEye,
  faTrash,
  faEdit,
  faRedoAlt,
  faImages,
  faSearch,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-artifact',
  templateUrl: './artifact.component.html',
  styleUrls: ['./artifact.component.css'],
})
export class ArtifactComponent implements OnInit {
  faEye = faEye;
  faTrash = faTrash;
  faEdit = faEdit;
  faRedoAlt = faRedoAlt;
  faImages = faImages;
  faSearch = faSearch;
  faLink = faLink;

  filterForm: FormGroup;
  filterText = '';
  artifacts: ArtifactDetailsDto[] = [];
  dataLoaded = false;

  constructor(
    private modalService: NgbModal,
    private artifactService: ArtifactService,
    private router: Router,
    private artifactUpdateService: ArtifactUpdateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllArtifacts();
    this.createFilterForm();
  }

  createFilterForm() {
    this.filterForm = this.formBuilder.group({
      filterText: [''],
    });
  }

  getAllArtifacts() {
    this.dataLoaded = false;
    this.artifactService.getAllDetails().subscribe((response) => {
      this.artifacts = response.data;
      this.dataLoaded = true;
    });
  }

  openDeleteForm(artifact: Artifact) {
    var modalReferance = this.modalService.open(ArtifactDeleteComponent, {
      size: 'm',
    });
    modalReferance.componentInstance.artifact = artifact;
  }

  goUpdateForm(artifact: ArtifactDetailsDto) {
    this.artifactUpdateService.setArtifact(artifact);
    this.router.navigate(['admin/artifact/update']);
  }

  goImageUpdateForm(artifact: ArtifactDetailsDto) {
    this.artifactUpdateService.setArtifact(artifact);
    this.router.navigate(['admin/artifact/upload-images']);
  }

  goYoutubeVideoUpdateForm(artifact:ArtifactDetailsDto){
    var modalReferance = this.modalService.open(YoutubeVideoUpdateComponent, {
      size: 'm',
    });
    modalReferance.componentInstance.artifact = artifact;
  }

  goPreview(artifact: ArtifactDetailsDto) {
    this.router.navigate(['admin/artifact/preview/' + artifact.artifact.id]);
  }

  filter() {
    this.filterText = this.filterForm.get('filterText')?.value;
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
