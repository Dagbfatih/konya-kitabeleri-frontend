import { ClaimAddComponent } from './../claim-add/claim-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperationClaimService } from './../../services/operation-claim.service';
import { OperationClaim } from './../../models/entities/operationClaim';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css'],
})
export class ClaimComponent implements OnInit {
  operationClaims: OperationClaim[] = [];
  operationClaimAddForm: FormGroup;

  constructor(
    private operationClaimService: OperationClaimService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllClaims();
  }

  getAllClaims() {
    this.operationClaimService.getAll().subscribe((response) => {
      this.operationClaims = response.data;
    });
  }

  openAddForm() {
    var modalReferance = this.modalService.open(ClaimAddComponent, {
      size: 'm',
    });
  }
}
