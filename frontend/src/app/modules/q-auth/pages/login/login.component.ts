import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { QThemeService } from '../../../q-theme/q-theme.service';
import { QThemeConfig } from '../../../q-theme';
import { Subscription } from 'rxjs';
import { IMe, QAuthService } from '../../q-auth.service';
import { MultiInputMode } from 'src/app/modules/ui-kit/components/multi-input/multi-input.component';
import { ToastService } from 'src/app/service/toast.service';
import { FormGroup } from '@angular/forms';
import { FormControlService } from 'src/app/service/form-control.service';
import firebase from 'firebase/compat/app';
import { RouteService } from 'src/app/service/route.service';
import { UserType } from 'src/app/consts/app.const';
import { DemoAccountComponent } from '../../components';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'q-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];
  multiInputMode = MultiInputMode.PHONE;
  multiInputAllMode = MultiInputMode.ALL;
  config: QThemeConfig;
  submitted: boolean = false;
  subscription: Subscription;
  verificationID: string;
  userInput = '';
  isVerifingOTP = false;
  form: FormGroup;
  ref: DynamicDialogRef;
  passwordForm: FormGroup;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;


  constructor(
    public configService: QThemeService,
    public routeService: RouteService,
    private qAuthService: QAuthService,
    private toastService: ToastService,
    private formControlService: FormControlService,
    public dialogService: DialogService,
    private cdref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
    this.form = new FormGroup({
      username: this.formControlService.getMultiInputControl(),
      otp: this.formControlService.getOTPControl(),
    });
    this.passwordForm = new FormGroup({
      username: this.formControlService.getMultiInputControl(),
      password: this.formControlService.getNameControl(),
    });
  }

  ngAfterViewInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible'
    });
  }

  login() {
    this.toastService.clear();
    if (this.submitted) return;
    if (this.form.controls.username.valid) {
      this.submitted = true;
      if (this.form.value.username) {
        this.lookupUserWithPhoneNumber();
      }
    }
  }

  loginByPassword() {
    this.toastService.clear();
    this.submitted = true;
    this.validateLoginResponse(this.qAuthService.loginWithPassword(this.passwordForm.getRawValue()));
  }

  resentOTP() {
    this.loginWithPhone();
  }

  lookupUserWithPhoneNumber() {
    this.qAuthService.lookupUserWithPhoneNumber(this.form.value.username)
      .subscribe({
        next: (resp: any) => {
          if (resp.status === 200) {
            this.loginWithPhone();
          } else {
            this.submitted = false;
            this.toastService.error({ message: `Oops, you are not a member yet. Please try Signing Up.` });
          }
        },
        error: (error) => {
          this.submitted = false;
          this.handleAuthError(error);
        }
      });
  }

  loginWithPhone() {
    this.qAuthService.loginWithPhone(this.recaptchaVerifier, this.form.value.username).then((verificationId) => {
      this.isVerifingOTP = true;
      this.verificationID = verificationId;
    }).catch((error) => {
      this.handleAuthError(error);
    }).finally(() => this.submitted = false)
  }

  verifyOTP() {
    this.toastService.clear();
    if (this.submitted) return;
    if (this.form.controls.otp.valid) {
      this.submitted = true;
      this.validateLoginResponse(this.qAuthService.verifyPhoneOTP(this.verificationID, this.form.value.otp))
    }
  }

  validateLoginResponse(req) {
    req.then((res: any) => {
      this.qAuthService.setBearerToken(res.accessToken || res.user.multiFactor.user.accessToken);
      this.qAuthService.me().then(({user}: IMe) => {
        if(user?.type === UserType.SUPER_ADMIN) {
          this.routeService.navigateWithPreserve('superadmin');
        } else if(user?.type === UserType.ADMIN) {
          this.routeService.navigateWithPreserve('admin');
        } else if(user?.type === UserType.EMPLOYEE){
          this.routeService.navigateWithPreserve('app');
        } else {
          this.handleAuthError({});
        }
      }).catch((err) => {
        this.handleAuthError(err);
        this.qAuthService.logout();
      });
    }).catch((error) => {
      this.handleAuthError(error);
    }).finally(() => this.submitted = false);
  }

  get controls() { return this.passwordForm.controls; }
  get username() { return this.form.get('username'); }
  get otp() { return this.form.get('otp'); }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleAuthError(error: any) {
    this.form.patchValue({ otp: '' });
    this.submitted = false;
    this.isVerifingOTP = false;
    let err = error?.error?.error || 'Please try again';
    switch (error.code) {
      case 'auth/invalid-phone-number':
        err = 'Invalid Phone Number';
        break;
      case 'auth/invalid-verification-code':
        err = 'Invalid OTP'
        break;
    }
    this.toastService.error({ message: err });
  }

  showDemoData(){
    this.ref = this.dialogService.open(DemoAccountComponent,{
      header:'Manage Demo Data',
      dismissableMask: true,
      styleClass:'w-10 md:w-6'
    });
    this.ref.onClose.subscribe((user) => {
      if (user) {
        this.validateLoginResponse(this.qAuthService.loginWithPassword({...user, username: user.email}));
      }
    });
  }

}