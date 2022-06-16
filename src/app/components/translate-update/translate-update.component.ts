import { Translate } from './../../models/entities/translate';
import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/models/entities/language';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { allTranslates } from 'src/app/services/translation.service';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-translate-update',
  templateUrl: './translate-update.component.html',
  styleUrls: ['./translate-update.component.css'],
})
export class TranslateUpdateComponent implements OnInit {
  translateUpdateForm: FormGroup;
  languages: Language[] = [];
  translate: Translate;
  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private languageService: LanguageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.createTranslateUpdateForm();
    this.getAllLanguages();
  }

  createTranslateUpdateForm() {
    this.translateUpdateForm = this.formBuilder.group({
      key: [this.translate.key, Validators.required],
      languageId: [this.translate.languageId, Validators.required],
      value: [this.translate.value, Validators.required],
    });
  }

  getAllLanguages() {
    this.languageService.getAll().subscribe((response) => {
      this.languages = response.data;
    });
  }

  close() {
    this.activeModal.close('Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Add Modal Dismissed');
  }

  update() {
    if (this.translateUpdateForm.valid) {
      let translateModel: Translate = Object.assign(
        {},
        this.translateUpdateForm.value
      );

      translateModel.languageId = +translateModel.languageId;

      this.translateService.update(translateModel).subscribe(
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
