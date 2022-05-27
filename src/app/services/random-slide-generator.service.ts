import { Injectable } from '@angular/core';
import randomItem from 'random-item';
import { Slide } from '../models/entities/slide';
import { SlideService } from './slide.service';

@Injectable({
  providedIn: 'root'
})

export class RandomSlideGeneratorService {
  public randomSlidesForLg: Slide[] = [];
  public randomSlidesForSm: Slide[] = [];
  slides: Slide[] = [];

  constructor(private slideService: SlideService) {
    this.getAllImages();
    this.getRandomSlidesForLg(3);
    this.getRandomSlideForSm(3);
  }

  getAllImages() {
    this.slides = this.slideService.getAll().data;
  }

  getRandomSlidesForLg(number: number) {
    let newSlides = this.slides.filter((s) => s.type === 'lg');
    this.randomSlidesForLg = randomItem.multiple(newSlides, number);
  }

  getRandomSlideForSm(number: number) {
    let newSlides = this.slides.filter((s) => s.type === 'sm');
    this.randomSlidesForSm = randomItem.multiple(newSlides, number);
  }

  public getSlidesByLg() {
    return this.randomSlidesForLg;
  }

  public getSlidesBySm() {
    return this.randomSlidesForSm;
  }
}