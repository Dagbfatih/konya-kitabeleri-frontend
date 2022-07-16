import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EpitaphImage } from './../models/entities/epitaphImage';
import { ServiceRepositoryBase } from './../core/services/service.repository.base';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../core/models/responseModels/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../core/models/responseModels/ListResponseModel';

@Injectable({
  providedIn: 'root',
})
export class EpitaphImageService {
  apiUrl = environment.apiUrl + 'epitaphImages/';

  constructor(protected httpClient: HttpClient) {}

  addImage(file: File, epitaphImage: EpitaphImage): Observable<ResponseModel> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('artifactId', epitaphImage.artifactId.toString());

    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'addimage',
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }

  update(file: File, epitaphImage: EpitaphImage): Observable<ResponseModel> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('artifactId', epitaphImage.artifactId.toString());
    formData.append('epitaphImagePath', epitaphImage.path);
    formData.append('epitaphImageId', epitaphImage.id!.toString());

    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'update',
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }

  delete(epitaphImage: EpitaphImage): Observable<ResponseModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: epitaphImage,
    };

    return this.httpClient.delete<ResponseModel>(
      this.apiUrl + 'delete',
      httpOptions
    );
  }

  getallbyartifact(
    artifactId: number
  ): Observable<ListResponseModel<EpitaphImage>> {
    return this.httpClient.get<ListResponseModel<EpitaphImage>>(
      this.apiUrl + 'getallbyartifactId?artifactId=' + artifactId
    );
  }

  getallbyartifactWithDefaults(
    artifactId: number
  ): Observable<ListResponseModel<EpitaphImage>> {
    return this.httpClient.get<ListResponseModel<EpitaphImage>>(
      this.apiUrl + 'getallbyartifactWithDefaults?artifactId=' + artifactId
    );
  }

  getall(): Observable<ListResponseModel<EpitaphImage>> {
    return this.httpClient.get<ListResponseModel<EpitaphImage>>(
      this.apiUrl + 'getall'
    );
  }

  get(id: number): Observable<ListResponseModel<EpitaphImage>> {
    return this.httpClient.get<ListResponseModel<EpitaphImage>>(
      this.apiUrl + 'getbyid?id?=' + id
    );
  }
}
