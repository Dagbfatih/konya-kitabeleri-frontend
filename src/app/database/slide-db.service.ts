import { Injectable } from '@angular/core';
import { DbServiceRepositoryBase } from '../core/database/db.service.repository.base';
import { Slide } from '../models/entities/slide';

@Injectable({
  providedIn: 'root',
})
export class SlideDbService extends DbServiceRepositoryBase<Slide> {
  data: Slide[] = [
    {
      id: 1,
      path: 'assets/home-slides-lg/slide1.jpeg',
      title:
        'slide1Title',
      description: '',
      type: 'lg',
    },
    {
      id: 2,
      path: 'assets/home-slides-lg/slide2.jpeg',
      title: 'mold14Title',
      description: 'mold14Description',
      type: 'lg',
    },
    {
      id: 3,
      path: 'assets/home-slides-lg/slide3.jpeg',
      title: 'mold14Title',
      description: 'mold14Description',
      type: 'lg',
    },
  ];
}
