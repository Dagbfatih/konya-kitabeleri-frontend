import { ListResponseModel } from './../core/models/responseModels/ListResponseModel';
import { ResponseModel } from './../core/models/responseModels/responseModel';
import { Observable } from 'rxjs';
import { ArtifactImage } from './../models/entities/artifactImage';
import { Injectable } from '@angular/core';
import { ServiceRepositoryLocalBase } from '../core/services/local-database/service.repository.base.local';
import { ArtifactImageDbService } from '../database/artifact-image-db.service';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtifactImageService {
  apiUrl = environment.apiUrl + 'artifactImages/';

  constructor(protected httpClient: HttpClient) {}

  addImage(
    file: File,
    artifactImage: ArtifactImage
  ): Observable<ResponseModel> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('artifactId', artifactImage.artifactId.toString());

    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'addimage',
      formData,
      {
        reportProgress: true,
      }
    );
  }

  update(file: File, artifactImage: ArtifactImage): Observable<ResponseModel> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('artifactId', artifactImage.artifactId.toString());
    formData.append('artifactImagePath', artifactImage.path);
    formData.append('artifactImageId', artifactImage.id!.toString());

    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'update',
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }

  delete(artifactImage: ArtifactImage): Observable<ResponseModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: artifactImage,
    };

    return this.httpClient.delete<ResponseModel>(
      this.apiUrl + 'delete',
      httpOptions
    );
  }

  getallbyartifact(
    artifactId: number
  ): Observable<ListResponseModel<ArtifactImage>> {
    return this.httpClient.get<ListResponseModel<ArtifactImage>>(
      this.apiUrl + 'getallbyartifactId?artifactId=' + artifactId
    );
  }

  getallbyartifactWithDefaults(
    artifactId: number
  ): Observable<ListResponseModel<ArtifactImage>> {
    return this.httpClient.get<ListResponseModel<ArtifactImage>>(
      this.apiUrl + 'getallbyartifactWithDefaults?artifactId=' + artifactId
    );
  }

  getall(): Observable<ListResponseModel<ArtifactImage>> {
    return this.httpClient.get<ListResponseModel<ArtifactImage>>(
      this.apiUrl + 'getall'
    );
  }

  get(id: number): Observable<ListResponseModel<ArtifactImage>> {
    return this.httpClient.get<ListResponseModel<ArtifactImage>>(
      this.apiUrl + 'getbyid?id?=' + id
    );
  }
}
