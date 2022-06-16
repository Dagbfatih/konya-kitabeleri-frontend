import { Router } from '@angular/router';
import { ArtifactDetailsDto } from './../../models/dtos/artifactDetailsDto';
import { ArtifactAddComponent } from './../artifact-add/artifact-add.component';
import { ArtifactService } from './../../services/artifact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Artifact } from './../../models/entities/artifact';
import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-artifact',
  templateUrl: './artifact.component.html',
  styleUrls: ['./artifact.component.css'],
})
export class ArtifactComponent implements OnInit {
  faEye = faEye;
  artifacts: ArtifactDetailsDto[] = [];

  constructor(
    private modalService: NgbModal,
    private artifactService: ArtifactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllArtifacts();
  }

  getAllArtifacts() {
    this.artifactService.getAllDetails().subscribe((response) => {
      this.artifacts = response.data;
    });
  }

  openAddForm() {
    // var modalReferance = this.modalService.open(ArtifactAddComponent, {
    //   size: 'm',
    // });
  }
}
