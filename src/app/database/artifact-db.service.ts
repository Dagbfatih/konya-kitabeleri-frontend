import { DbServiceRepositoryBase } from '../core/database/db.service.repository.base';
import { Artifact } from '../models/entities/artifact';
import { ItemResponseModel } from '../core/models/responseModels/ItemResponseModel';
import { ListResponseModel } from '../core/models/responseModels/ListResponseModel';
import { ResponseModel } from '../core/models/responseModels/responseModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtifactDbService extends DbServiceRepositoryBase<Artifact> {
  data: Artifact[] = [
    {
      id: 1,
      name: 'Mevlana Heykeli',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
    },
    {
      id: 2,
      name: 'Sanat Müzesi',
      date: new Date(),
      description:
        'Tarihin önemli isimlerinden Nasreddin Hoca’nın da yaşamına tanıklık etmiş, köklü tarihi ve kültürü ile Türkiye’de mutlaka görülmesi gereken şehirlerden bir Konya gezilecek yerler bakımından oldukça zengin bir çeşitliliğe sahip. Sadece kültür turizmi için değil inanç turizmi için de her yıl binlerce yerli ve yabancı turist burayı ziyaret ediyor.',
    },
  ];
}
