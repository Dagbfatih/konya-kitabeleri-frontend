import { Component, OnInit } from '@angular/core';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { socialLinks } from 'src/app/constants/social-links';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  faEnvolpe = faEnvelope;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  
  constructor() {}

  ngOnInit(): void {}

  getSocialLink(key: string): string {
    return socialLinks.find((s) => s.key == key)!.link;
  }
}
