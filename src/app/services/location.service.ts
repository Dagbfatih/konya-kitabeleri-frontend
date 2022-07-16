import { HttpClient } from '@angular/common/http';
import { ServiceRepositoryBase } from './../core/services/service.repository.base';
import { Injectable } from '@angular/core';
import { Location } from '../models/entities/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends ServiceRepositoryBase<Location> {
  constructor(protected httpClient: HttpClient) {
    super('locations', httpClient);
  }
}
