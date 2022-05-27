import { Injectable } from '@angular/core';
import { DbServiceRepositoryBase } from '../core/database/db.service.repository.base';
import { Language } from '../models/entities/language';

@Injectable({
  providedIn: 'root',
})
export class LanguageDbService extends DbServiceRepositoryBase<Language> {
  data: Language[] = [
    {
      id: 1,
      code: 'tr-TR',
      languageName: 'Turkish',
      flagCode:'tr'
    },
    {
      id: 2,
      code: 'en-US',
      languageName: 'English',
      flagCode:'us'
    },
  ];
}
