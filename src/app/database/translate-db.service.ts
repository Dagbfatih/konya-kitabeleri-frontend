import { Translate } from '../models/entities/translate';
import { DbServiceRepositoryBase } from '../core/database/db.service.repository.base';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateDbService extends DbServiceRepositoryBase<Translate> {
  data: Translate[] = [
    {
      id: 1,
      languageId: 1,
      key: 'historicalArtifacts',
      value: 'Tarihi Eserler',
    },
    {
      id: 2,
      languageId: 2,
      key: 'historicalArtifacts',
      value: 'Historical Artifacts',
    },
    {
      id: 3,
      languageId: 1,
      key: 'cities',
      value: 'Şehirler',
    },
    {
      id: 4,
      languageId: 2,
      key: 'cities',
      value: 'Cities',
    },
    {
      id: 5,
      languageId: 1,
      key: 'aboutUs',
      value: 'Hakkımızda',
    },
    {
      id: 6,
      languageId: 2,
      key: 'aboutUs',
      value: 'About Us',
    },
    {
      id: 7,
      languageId: 1,
      key: 'settings',
      value: 'Ayarlar',
    },
    {
      id: 8,
      languageId: 2,
      key: 'settings',
      value: 'Settings',
    },
    {
      id: 9,
      languageId: 1,
      key: 'language',
      value: 'Dil',
    },
    {
      id: 10,
      languageId: 2,
      key: 'language',
      value: 'Language',
    },
    {
      id: 11,
      languageId: 1,
      key: 'selectLanguage',
      value: 'Dil Seçin',
    },
    {
      id: 12,
      languageId: 2,
      key: 'selectLanguage',
      value: 'Select Language',
    },
    {
      id: 13,
      languageId: 1,
      key: 'languageSettings',
      value: 'Dil Ayarları',
    },
    {
      id: 14,
      languageId: 2,
      key: 'languageSettings',
      value: 'Language Settings',
    },
    {
      id: 15,
      languageId: 1,
      key: 'links',
      value: 'Linkler',
    },
    {
      id: 16,
      languageId: 2,
      key: 'links',
      value: 'Links',
    },
    {
      id: 17,
      languageId: 1,
      key: 'social',
      value: 'Sosyal',
    },
    {
      id: 18,
      languageId: 2,
      key: 'social',
      value: 'Social',
    },
    {
      id: 19,
      languageId: 1,
      key: 'contact',
      value: 'İletişim',
    },
    {
      id: 20,
      languageId: 2,
      key: 'contact',
      value: 'Contact',
    },
    {
      id: 21,
      languageId: 1,
      key: 'whoAreWe',
      value: 'Biz kimiz',
    },
    {
      id: 22,
      languageId: 2,
      key: 'whoAreWe',
      value: 'Who are we',
    },
    {
      id: 22,
      languageId: 1,
      key: 'homePage',
      value: 'Ana Sayfa',
    },
    {
      id: 22,
      languageId: 2,
      key: 'homePage',
      value: 'Home Page',
    },
  ];
}
