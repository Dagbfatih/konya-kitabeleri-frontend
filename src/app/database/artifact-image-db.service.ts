import { ArtifactImage } from './../models/entities/artifactImage';
import { Injectable } from '@angular/core';
import { DbServiceRepositoryBase } from '../core/database/db.service.repository.base';

@Injectable({
  providedIn: 'root',
})
export class ArtifactImageDbService extends DbServiceRepositoryBase<ArtifactImage> {
  data: ArtifactImage[] = [
    {
      id: 1,
      artifactId: 1,
      path: 'https://www.etstur.com/letsgo/wp-content/uploads/2018/11/konya-gezilecek-yerler-mavlana-turbesi.jpg',
    },
    {
      id: 2,
      artifactId: 1,
      path: 'http://okuryazarim.com/wp-content/uploads/2017/06/KONYA-7.jpg',
    },
    {
      id: 3,
      artifactId: 1,
      path: 'https://blog.biletbayi.com/wp-content/uploads/2020/03/konya-karatay-medresesi-scaled.jpg',
    },
    {
      id: 4,
      artifactId: 2,
      path: 'https://cdn.turkishairlines.com/m/1daf2f1159d6a668/original/Travel-Guide-of-Konya-via-Turkish-Airlines.jpg',
    },
    {
      id: 5,
      artifactId: 2,
      path: 'https://cdn.otelleri.net/landing/konya/gezi-rehberi/konya-mevlana-muzesi-2357-1c.jpg',
    },
  ];
}
