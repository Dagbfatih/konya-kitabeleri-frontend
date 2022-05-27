import { HistPeriod } from './../models/entities/histPeriod';
import { Injectable } from '@angular/core';
import { DbServiceRepositoryBase } from '../core/database/db.service.repository.base';

@Injectable({
  providedIn: 'root',
})
export class HistPeriodDbService extends DbServiceRepositoryBase<HistPeriod> {
  data: HistPeriod[] = [
    {
      id: 1,
      name: 'Selçuklu Dönemi',
      description: '1400-1500',
      paramName: 'selcuklu-donemi',
    },
    {
      id: 2,
      name: 'Osmanlı Dönemi',
      description: '1500-1600',
      paramName: 'osmanli-donemi',
    },
  ];
}
