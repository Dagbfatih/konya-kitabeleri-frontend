import { ArtifactTypeAddComponent } from './../artifact-type-add/artifact-type-add.component';
import { ArtifactTypeService } from './../../services/artifact-type.service';
import { ArtifactType } from './../../models/entities/artifactType';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArtifactTypeDeleteComponent } from '../artifact-type-delete/artifact-type-delete.component';
import { ArtifactTypeUpdateComponent } from '../artifact-type-update/artifact-type-update.component';
import { faEdit, faRedoAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-artifact-type',
  templateUrl: './artifact-type.component.html',
  styleUrls: ['./artifact-type.component.css'],
})
export class ArtifactTypeComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faRedoAlt = faRedoAlt;

  artifactTypes: ArtifactType[] = [];
  dataLoaded = false;

  constructor(
    private artifactTypeService: ArtifactTypeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.dataLoaded = false;
    this.artifactTypeService.getAll().subscribe((response) => {
      this.artifactTypes = response.data;
      this.dataLoaded = true;
    });
  }

  openAddForm() {
    var modalReferance = this.modalService.open(ArtifactTypeAddComponent, {
      size: 'm',
    });
  }

  openDeleteForm(artifactType: ArtifactType) {
    var modalReferance = this.modalService.open(ArtifactTypeDeleteComponent, {
      size: 'm',
      modalDialogClass: 'modal-dialog-centered',
    });
    modalReferance.componentInstance.artifactType = artifactType;
  }

  openUpdateForm(artifactType: ArtifactType) {
    var modalReferance = this.modalService.open(ArtifactTypeUpdateComponent, {
      size: 'm',
      modalDialogClass: 'modal-dialog-centered',
    });
    modalReferance.componentInstance.artifactType = artifactType;
  }
}
