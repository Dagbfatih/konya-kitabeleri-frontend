import { Router } from '@angular/router';
import { ArtifactAddService } from './../../services/artifact-add.service';
import { Location } from './../../models/entities/location';
import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { allTranslates } from 'src/app/services/translation.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css'],
})
export class LocationAddComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  locationAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private locationService: LocationService,
    private artifactAddService: ArtifactAddService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLocationAddForm();
  }

  createLocationAddForm() {
    this.locationAddForm = this.formBuilder.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });
  }

  add() {
    if (this.locationAddForm.valid) {
      let locationModel: Location = Object.assign(
        {},
        this.locationAddForm.value
      );

      locationModel.latitude = +locationModel.latitude;
      locationModel.longitude = +locationModel.longitude;

      this.locationService.add(locationModel).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            this.getTranslate('successful')
          );
          this.router.navigate(['admin/artifact/add']);
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
    }
  }

  goBack() {
    history.back();
  }

  get latitude() {
    return this.locationAddForm.get('latitude')?.value;
  }
  get longitude() {
    return this.locationAddForm.get('longitude')?.value;
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
