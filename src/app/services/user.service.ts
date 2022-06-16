import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { Translate } from '../models/entities/translate';
import { User } from '../models/entities/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ServiceRepositoryBase<User> {
  apiUrl = environment.apiUrl + 'users/';
  constructor(protected httpClient: HttpClient) {
    super('users', httpClient);
  }
}
