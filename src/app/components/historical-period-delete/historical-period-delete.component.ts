import { HistPeriodService } from './../../services/hist-period.service';
import { HistPeriod } from './../../models/entities/histPeriod';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-historical-period-delete',
  templateUrl: './historical-period-delete.component.html',
  styleUrls: ['./historical-period-delete.component.css'],
})
export class HistoricalPeriodDeleteComponent implements OnInit {
  histPeriod: HistPeriod;

  constructor(
    private histPeriodService: HistPeriodService,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.histPeriodService.delete(this.histPeriod).subscribe(
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

    this.close();
  }

  close() {
    this.activeModal.close('Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Add Modal Dismissed');
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
