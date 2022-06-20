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

  artifacts: ArtifactDetailsDto[] = [];
  dataLoaded = false;

  constructor(
    private modalService: NgbModal,
    private artifactService: ArtifactService,
    private router: Router,
    private artifactUpdateService: ArtifactUpdateService
  ) {}

  ngOnInit(): void {
    this.getAllArtifacts();
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

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
