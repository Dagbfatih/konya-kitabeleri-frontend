import { EmailAddress } from './../../models/entities/emailAddress';
import { EmailMessage } from './../../models/entities/emailMessage';
import { MailService } from './../../services/mail.service';
import { RegisterModel } from './../../models/entities/registerModel';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { ErrorService } from './../../services/error.service';
import { AuthService } from './../../services/auth.service';
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
import { environment } from 'src/environments/environment';
import { CustomerForRegisterDto } from 'src/app/models/dtos/customerForRegisterDto';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private router: Router,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private mailService: MailService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.checkPasswords }
    );
  }

  register() {
    this.submitted = true;
    if (this.registerForm.valid) {
      let registerModel: RegisterModel = Object.assign(
        {},
        this.registerForm.value
      );

      let customerForRegisterModel: CustomerForRegisterDto =
        this.createCustomerForRegisterDto(registerModel, false);

      this.authService.registerWithCustomer(customerForRegisterModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, this.getTranslate('successful'));
          // this.tokenService.setLocal(response.data.accessToken.token);
          this.sendMail(registerModel);
          // window.location.reload();
          // this.toastrService.info(
          //   this.getTranslate('redirectToLoginPage'),
          //   this.getTranslate('info')
          // );
          this.router.navigate(['/login']);
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
    } else {
      this.toastrService.warning(
        this.registerForm.errors?.message,
        this.getTranslate('warning')
      );
    }
  }

  createCustomerForRegisterDto(
    registerModel: RegisterModel,
    approved: boolean
  ): CustomerForRegisterDto {
    let newRegisterModel: CustomerForRegisterDto = {
      customer: {
        userId: 0,
        approved: approved,
      },
      user: {
        firstName: registerModel.firstName,
        lastName: registerModel.lastName,
        email: registerModel.email,
        password: registerModel.password,
      },
    };

    return newRegisterModel;
  }

  sendMail(userInfo: RegisterModel) {
    let fromEmailAddresses: EmailAddress[] = [
      {
        name: userInfo.firstName + ' ' + userInfo.lastName,
        address: userInfo.email,
      },
    ];

    let toEmailAddresses: EmailAddress[] = [
      { name: 'admin', address: 'kitabelerindili@gmail.com' },
    ];

    let emailMessage: EmailMessage = {
      fromAddresses: fromEmailAddresses,
      subject: 'Sisteme bir kullanıcı kayıt oldu',
      content:
        'Kullanıcı: ' +
        userInfo.firstName +
        ' ' +
        userInfo.lastName +
        '\nEmail: ' +
        userInfo.email,
      toAddresses: toEmailAddresses,
    };

    this.mailService.send(emailMessage).subscribe(
      (response) => {
        // this.toastrService.success(
        //   response.message,
        //   this.getTranslate('successful')
        // );
      },
      (responseError) => {
        // this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass
      ? null
      : { notSame: true, message: this.getTranslate('passwordsDontMatch') };
  };

  get getControls() {
    return this.registerForm.controls;
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
