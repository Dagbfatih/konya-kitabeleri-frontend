import { UserOperationClaimService } from './../../services/user-operation-claim.service';
import { UserOperationClaim } from './../../models/entities/userOperationClaim';
import { OperationClaim } from './../../models/entities/operationClaim';
import { OperationClaimService } from './../../services/operation-claim.service';
import { User } from './../../models/entities/user';
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
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-user-claim-add',
  templateUrl: './user-claim-add.component.html',
  styleUrls: ['./user-claim-add.component.css'],
})
export class UserClaimAddComponent implements OnInit {
  userClaimAddForm: FormGroup;
  user: User;
  operationClaims: OperationClaim[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private operationClaimService: OperationClaimService,
    private userOperationClaimService: UserOperationClaimService
  ) {}

  ngOnInit(): void {
    this.createUserClaimAddForm();
    this.getAllOperationClaims();
  }

  getAllOperationClaims() {
    this.operationClaimService.getAll().subscribe((response) => {
      this.operationClaims = response.data;
    });
  }

  createUserClaimAddForm() {
    this.userClaimAddForm = this.formBuilder.group({
      userId: [this.user.id, Validators.required],
      operationClaimId: ['', Validators.required],
    });
  }

  close() {
    this.activeModal.close('Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Add Modal Dismissed');
  }

  add() {
    if (this.userClaimAddForm.valid) {
      let operationClaimModel: UserOperationClaim = Object.assign(
        {},
        this.userClaimAddForm.value
      );

      operationClaimModel.operationClaimId = +operationClaimModel.operationClaimId!;

      this.userOperationClaimService.add(operationClaimModel).subscribe(
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
