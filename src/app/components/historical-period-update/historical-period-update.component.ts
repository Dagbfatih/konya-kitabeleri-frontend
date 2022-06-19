import { HistPeriod } from './../../models/entities/histPeriod';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HistPeriodService } from 'src/app/services/hist-period.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-historical-period-update',
  templateUrl: './historical-period-update.component.html',
  styleUrls: ['./historical-period-update.component.css'],
})
export class HistoricalPeriodUpdateComponent implements OnInit {
  histPeriodUpdateForm: FormGroup;
  histPeriod: HistPeriod;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private histPeriodService: HistPeriodService
  ) {}

  ngOnInit(): void {
    this.createhistPeriodUpdateForm();
  }

  createhistPeriodUpdateForm() {
    this.histPeriodUpdateForm = this.formBuilder.group({
      name: [this.histPeriod.name, Validators.required],
      description: [this.histPeriod.description, Validators.required],
      paramName: [this.histPeriod.paramName, Validators.required],
    });
  }

  close() {
    this.activeModal.close('Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Add Modal Dismissed');
  }

  update() {
    if (this.histPeriodUpdateForm.valid) {
      let histPeriodModel: HistPeriod = Object.assign(
        {},
        this.histPeriodUpdateForm.value
      );
      histPeriodModel.id = this.histPeriod.id;
      
      this.histPeriodService.update(histPeriodModel).subscribe(
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
