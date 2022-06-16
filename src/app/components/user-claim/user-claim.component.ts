import { ErrorService } from './../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { UserClaimAddComponent } from './../user-claim-add/user-claim-add.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../../models/entities/user';
import { UserOperationClaimService } from './../../services/user-operation-claim.service';
import { UserOperationClaimDetailsDto } from './../../models/dtos/userOperationClaimDetailsDto';
import { UserOperationClaim } from './../../models/entities/userOperationClaim';
import { Component, OnInit } from '@angular/core';
import { allTranslates } from 'src/app/services/translation.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-claim',
  templateUrl: './user-claim.component.html',
  styleUrls: ['./user-claim.component.css'],
})
export class UserClaimComponent implements OnInit {
  faTrash=faTrash;
  userOperationClaims: UserOperationClaimDetailsDto[] = [];
  user: User;

  constructor(
    private userOperationClaimService: UserOperationClaimService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getClaimsByUser();
  }

  close() {
    this.activeModal.close('Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Add Modal Dismissed');
  }

  getClaimsByUser() {
    this.userOperationClaimService
      .getAllDetailsByUser(this.user.id)
      .subscribe((response) => {
        this.userOperationClaims = response.data;
      });
  }

  deleteUserClaim(userClaim: UserOperationClaimDetailsDto) {
    let deletedUserClaim: UserOperationClaim = {
      id: userClaim.userOperationClaimId,
      userId: userClaim.user.id,
      operationClaimId: userClaim.operationClaim.id,
    };
    this.userOperationClaimService.delete(deletedUserClaim).subscribe(
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

  openAddModal(user: User) {
    let modalReference = this.modalService.open(UserClaimAddComponent, {
      size: 'xl',
    });
    modalReference.componentInstance.user = user;
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
