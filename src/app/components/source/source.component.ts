import { Reference } from './../../models/entities/reference';
import { Component, OnInit } from '@angular/core';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css'],
})
export class SourceComponent implements OnInit {
  faArrowCircleRight = faArrowCircleRight;
  references: Reference[] = [
    {
      link: 'www.3dmekanlar.com',
    },
    {
      link: 'www.selcuklubel.com',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
