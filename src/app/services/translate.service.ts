import { LanguageService } from './language.service';
import { TranslateDbService } from '../database/translate-db.service';
import { Translate } from './../models/entities/translate';
import { Injectable } from '@angular/core';
import { ServiceRepositoryLocalBase } from '../core/services/local-database/service.repository.base.local';

@Injectable({
  providedIn: 'root',
})
export class TranslateService extends ServiceRepositoryLocalBase<Translate> {
  constructor(
    protected dbService: TranslateDbService,
    private languageService: LanguageService
  ) {
    super(dbService);
  }

  getAllByCode(code: string): Translate[] {
    let languageId = this.languageService.getByCode(code)?.id;
    let data = this.dbService.getAll();
    
    return data.data.filter((t) => t.languageId === languageId);
  }
}
