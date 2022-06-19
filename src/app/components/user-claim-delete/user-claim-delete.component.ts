import { UserOperationClaim } from './../../models/entities/userOperationClaim';
import { UserOperationClaimService } from './../../services/user-operation-claim.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-user-claim-delete',
  templateUrl: './user-claim-delete.component.html',
  styleUrls: ['./user-claim-delete.component.css'],
})
export class UserClaimDeleteComponent implements OnInit {
  userClaim: UserOperationClaim;
  userClaimName: string;
  
  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private userOperationClaimService: UserOperationClaimService
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('Delete Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Delete Modal Dismissed');
  }

  delete() {
    this.userOperationClaimService.delete(this.userClaim).subscribe(
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

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
