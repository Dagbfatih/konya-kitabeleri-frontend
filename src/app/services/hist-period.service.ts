import { HistPeriodDbService } from './../database/hist-period-db.service';
import { HistPeriod } from './../models/entities/histPeriod';
import { Injectable } from '@angular/core';
import { ServiceRepositoryLocalBase } from '../core/services/local-database/service.repository.base.local';

@Injectable({
  providedIn: 'root',
})
export class HistPeriodService extends ServiceRepositoryLocalBase<HistPeriod> {
  constructor(protected dbService: HistPeriodDbService) {
    super(dbService);
  }

  getById(id: number): HistPeriod | undefined {
    return this.dbService.getAll().data.find((h) => h.id === id);
  }
}
