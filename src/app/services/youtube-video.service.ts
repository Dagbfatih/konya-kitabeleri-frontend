import { YoutubeVideo } from './../models/entities/youtubeVideo';
import { Injectable } from '@angular/core';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { HttpClient } from '@angular/common/http';
import getVideoId from 'get-video-id';

@Injectable({
  providedIn: 'root',
})
export class YoutubeVideoService extends ServiceRepositoryBase<YoutubeVideo> {
  constructor(protected httpClient: HttpClient) {
    super('youtubevideos', httpClient);
  }

  getVideoIdFromLink(link: string): string {
    return getVideoId(link).id ?? '';
  }
}
