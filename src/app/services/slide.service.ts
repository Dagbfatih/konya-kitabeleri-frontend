import { Injectable } from '@angular/core';
import { ServiceRepositoryLocalBase } from '../core/services/local-database/service.repository.base.local';
import { SlideDbService } from '../database/slide-db.service';
import { Slide } from '../models/entities/slide';

@Injectable({
  providedIn: 'root',
})
export class SlideService extends ServiceRepositoryLocalBase<Slide> {
  constructor(protected dbService: SlideDbService) {
    super(dbService);
  }
}
