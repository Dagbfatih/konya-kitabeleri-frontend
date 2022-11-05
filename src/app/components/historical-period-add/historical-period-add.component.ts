import { HistPeriodService } from './../../services/hist-period.service';
import { HistPeriod } from './../../models/entities/histPeriod';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { allTranslates } from 'src/app/services/translation.service';
import 'src/app/core/extensions/type-extensions/localization';

@Component({
  selector: 'app-historical-period-add',
  templateUrl: './historical-period-add.component.html',
  styleUrls: ['./historical-period-add.component.css'],
})
export class HistoricalPeriodAddComponent implements OnInit {
  histPeriodAddForm: FormGroup;
  parameterName: string;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private histPeriodService: HistPeriodService
  ) {}

  ngOnInit(): void {
    this.createhistPeriodAddForm();
    this.checkPeriodNameChanged();
  }

  checkPeriodNameChanged() {
    this.histPeriodAddForm
      .get('name')
      ?.valueChanges.subscribe((value: string) => {
        this.parameterName = this.localizeParameterName(value);
      });
  }

  createhistPeriodAddForm() {
    this.histPeriodAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      paramName: [''],
    });
  }

  close() {
    this.activeModal.close('Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Add Modal Dismissed');
  }

  localizeParameterName(value: string) {
    return value
      .turkishtoEnglish()
      .toLocaleLowerCase('en-US')
      .replace(' ', '-');
  }

  add() {
    if (this.histPeriodAddForm.valid) {
      let histPeriodModel: HistPeriod = Object.assign(
        {},
        this.histPeriodAddForm.value
      );

      histPeriodModel.paramName = this.parameterName;

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
