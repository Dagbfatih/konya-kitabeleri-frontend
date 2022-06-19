import { Translate } from './../../models/entities/translate';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { allTranslates } from 'src/app/services/translation.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-translate-delete',
  templateUrl: './translate-delete.component.html',
  styleUrls: ['./translate-delete.component.css'],
})
export class TranslateDeleteComponent implements OnInit {
  translate: Translate;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Add Modal Dismissed');
  }

  delete() {
    this.translateService.delete(this.translate).subscribe((response) => {
      this.toastrService.success(
        response.message,
        this.getTranslate('successful')
      );
    });
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
