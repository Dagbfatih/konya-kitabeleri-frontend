import { VirtualTourComponent } from './../virtual-tour/virtual-tour.component';
import { ArtifactTypeComponent } from './../artifact-type/artifact-type.component';
import { HistoricalPeriodComponent } from './../historical-period/historical-period.component';
import { LanguageComponent } from './../language/language.component';
import { ArtifactComponent } from './../artifact/artifact.component';
import { ImageComponent } from './../image/image.component';
import { ContentComponent } from './../content/content.component';
import { TranslateComponent } from './../translate/translate.component';
import { UserClaimComponent } from './../user-claim/user-claim.component';
import { ClaimComponent } from './../claim/claim.component';
import { UserComponent } from './../user/user.component';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import {
  faClipboardList,
  faCogs,
  faGlobe,
  faImages,
  faLandmark,
  faLanguage,
  faTachometerAlt,
  faUsers,
  faUsersCog,
} from '@fortawesome/free-solid-svg-icons';
import { ArtifactAddComponent } from '../artifact-add/artifact-add.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  faClipboardList = faClipboardList;
  faUsersCog = faUsersCog;
  faLanguage = faLanguage;
  faCogs = faCogs;
  faImages = faImages;
  faGauge = faTachometerAlt;
  faLandmark = faLandmark;
  faGlobe = faGlobe;

  currentMainPage: string = '';
  currentComponent: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscribeRoute();
    // this.runActiveStateManagementScript();
  }

  navigate(url: string, id: string) {
    this.router.navigate([url]).then(() => {
      this.scroll(id);
    });
  }

  runActiveStateManagementScript() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        $('.nav-link.nav-link-h.active').removeClass('active');
        $('.nav-link.nav-link-h').attr('routerLink', function (i, val) {
          if (val === event.url) {
            $(this).addClass('active');
          }
        });
      }
    });
  }

  scroll(id: string) {
    var element = document.getElementById(id);
    var headerOffset = 135;
    var elementPosition = element!.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

  subscribeRoute() {
    this.activatedRoute.params.subscribe((param) => {
      this.currentMainPage = param['currentPage'];
      switch (param['currentPage']) {
        case 'manage-users':
          this.currentComponent = UserComponent;
          break;
        case 'manage-claims':
          this.currentComponent = ClaimComponent;
          break;
        case 'manage-user-claims':
          this.currentComponent = UserClaimComponent;
          break;
        case 'manage-translates':
          this.currentComponent = TranslateComponent;
          break;
        case 'manage-languages':
          this.currentComponent = LanguageComponent;
          break;
        case 'manage-content':
          this.currentComponent = ContentComponent;
          break;
        case 'manage-images':
          this.currentComponent = ImageComponent;
          break;
        case 'manage-artifacts':
          this.currentComponent = ArtifactComponent;
          break;
        case 'manage-historical-periods':
          this.currentComponent = HistoricalPeriodComponent;
          break;
        case 'manage-artifact-types':
          this.currentComponent = ArtifactTypeComponent;
          break;
        default:
          this.currentComponent = UserComponent;
          break;
      }
    });
  }
}
