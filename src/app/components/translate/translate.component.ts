import { TranslateDeleteComponent } from './../translate-delete/translate-delete.component';
import { LanguageService } from './../../services/language.service';
import { Language } from './../../models/entities/language';
import { TranslateAddComponent } from './../translate-add/translate-add.component';
import { TranslateService } from './../../services/translate.service';
import { Translate } from './../../models/entities/translate';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateUpdateComponent } from '../translate-update/translate-update.component';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
})
export class TranslateComponent implements OnInit {
  translates: Translate[] = [];
  faEdit = faEdit;
  faTrash = faTrash;
  languages: Language[] = [];

  constructor(
    private translateService: TranslateService,
    private modalService: NgbModal,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.getAllLanguages();
  }

  getAllLanguages() {
    this.languageService.getAll().subscribe((response) => {
      this.languages = response.data;
    });
  }

  getAll() {
    this.translateService.getAll().subscribe((response) => {
      this.translates = response.data;
    });
  }

  getNameByLanguageId(languageId: number): string {
    return this.languages.find((l) => l.id === languageId)?.languageName!;
  }

  openAddForm() {
    var modalReferance = this.modalService.open(TranslateAddComponent, {
      size: 'm',
    });
  }

  openDeleteForm(translate: Translate) {
    var modalReferance = this.modalService.open(TranslateDeleteComponent, {
      size: 'm',
    });
    modalReferance.componentInstance.translate = translate;
  }

  openUpdateForm(translate: Translate) {
    var modalReferance = this.modalService.open(TranslateUpdateComponent, {
      size: 'm',
    });
    modalReferance.componentInstance.translate = translate;
  }
}
