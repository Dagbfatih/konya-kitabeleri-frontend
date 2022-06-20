import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../core/models/responseModels/responseModel';
import { EmailMessage } from '../models/entities/emailMessage';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  apiUrl = environment.apiUrl + 'mails/';

  constructor(private httpClient: HttpClient) {}

  send(emailMessage: EmailMessage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'send',
      emailMessage
    );
  }
}
