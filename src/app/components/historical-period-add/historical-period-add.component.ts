import { HistPeriodService } from './../../services/hist-period.service';
import { HistPeriod } from './../../models/entities/histPeriod';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-historical-period-add',
  templateUrl: './historical-period-add.component.html',
  styleUrls: ['./historical-period-add.component.css'],
})
export class HistoricalPeriodAddComponent implements OnInit {
  histPeriodAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private histPeriodService: HistPeriodService
  ) {}

  ngOnInit(): void {
    this.createhistPeriodAddForm();
  }

  createhistPeriodAddForm() {
    this.histPeriodAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      paramName: ['', Validators.required],
    });
  }

  close() {
    this.activeModal.close('Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Add Modal Dismissed');
  }

  add() {
    if (this.histPeriodAddForm.valid) {
      let histPeriodModel: HistPeriod = Object.assign(
        {},
        this.histPeriodAddForm.value
      );

      this.histPeriodService.add(histPeriodModel).subscribe(
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
