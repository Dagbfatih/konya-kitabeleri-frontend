import { ErrorService } from './../../services/error.service';
import { HistPeriodService } from './../../services/hist-period.service';
import { HistPeriod } from './../../models/entities/histPeriod';
import { ArtifactFilterPipe } from './../../pipes/artifact-filter.pipe';
import { ArtifactService } from 'src/app/services/artifact.service';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../models/entities/user';
import { TokenService } from 'src/app/services/token.service';
import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { allTranslates } from 'src/app/services/translation.service';
import { environment } from 'src/environments/environment';
import { Language } from 'src/app/models/entities/language';
import { LanguageService } from 'src/app/services/language.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Artifact } from 'src/app/models/entities/artifact';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { socialLinks } from 'src/app/constants/social-links';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  faSearch = faSearch;
  baseUrl = environment.baseUrl;
  searchText = '';
  languages: Language[] = [];
  searchEngineForm: FormGroup;
  currentLanguage: Language = {} as Language;
  artifacts: ArtifactDetailsDto[] = [];
  filteredArtifacts: ArtifactDetailsDto[] = [];
  histPeriods: HistPeriod[] = [];

  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private artifactService: ArtifactService,
    private artifactFilterPipe: ArtifactFilterPipe,
    private orderByPipe: OrderByPipe,
    private histPeriodService: HistPeriodService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getLanguages();
    this.getArtifacts();
    this.runActiveStateManagementScript();
    this.runCollapseScript();
    this.createSearchEngineForm();
    this.getCurrentLanguage();
    this.getAllHistPeriods();
  }

  getAllHistPeriods() {
    this.histPeriodService.getAll().subscribe(
      (response) => {
        this.histPeriods = response.data;
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  getArtifacts() {
    this.artifactService
      .getAllDetailsAndDefaultImages()
      .subscribe((response) => {
        this.artifacts = response.data;
        this.filteredArtifacts = this.artifacts;
      });
  }

  getCurrentLanguage() {
    this.languageService
      .getByCode(this.settingsService.getLanguageCodeFromLocalStorage())
      .subscribe((response) => {
        this.currentLanguage = response.data;
      });
  }

  runCollapseScript() {
    $('.navbar-collapse .nav-link-collapse').on('click', function () {
      (<any>$('.navbar-collapse')).collapse('hide');
    });
  }

  getSocialLink(key: string): string {
    return socialLinks.find((s) => s.key == key)!.link;
  }

  createSearchEngineForm() {
    this.searchEngineForm = this.formBuilder.group({
      searchText: [''],
    });
  }

  search: OperatorFunction<string, readonly ArtifactDetailsDto[]> = (
    text$: Observable<string>
  ) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((searchedText) =>
        searchedText.length < 2 ? [] : this.filterArtifacts(searchedText)
      )
    );
  };

  inputFormatter = (x: ArtifactDetailsDto) =>
    this.getTranslate(x.artifact?.name)!;

  filterArtifacts(searchedText: string) {
    this.filteredArtifacts = this.artifactFilterPipe.transform(
      this.artifacts,
      searchedText
    );

    return this.filteredArtifacts;
  }

  searchSelected(item: any) {
    this.router.navigate([
      'konya-kitabeleri/' +
        item.item.historicalPeriod.paramName +
        '/' +
        item.item.artifactType.id +
        '/' +
        item.item.artifact.id,
    ]);
  }

  runActiveStateManagementScript() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        $('.nav-link.nav-link-custom.active').removeClass('active');
        $('.nav-link.nav-link-custom').attr('routerLink', function (i, val) {
          if (val === event.url) {
            $(this).addClass('active');
          }
        });
      }
    });
  }

  navigate(url: string, id: string) {
    this.router.navigate([url]).then(() => {
      this.scroll(id);
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

  getLanguageFlagCode(code: string): string {
    if (code === 'en-US') {
      return 'us';
    }
    return code?.slice(0, 2);
  }

  getCurrentLanguageCode() {
    return this.settingsService.getLanguageCodeFromLocalStorage();
  }

  getLanguages() {
    this.languageService.getAll().subscribe((response) => {
      this.languages = response.data;
    });
  }

  getUser(): User {
    return this.tokenService.getUserWithJWT();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  signOut() {
    this.authService.signOut();
    sessionStorage.removeItem('adminCurrentPage');
    this.toastrService.info('Going to homepage...', 'Logged Out');
    this.router.navigate(['']);
  }

  setLanguage(languageCode: string) {
    this.settingsService.setLanguage(languageCode);
    location.reload();
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
