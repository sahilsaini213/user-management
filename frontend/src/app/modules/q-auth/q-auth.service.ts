import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService, LOCAL_STORAGE } from 'src/app/service/local-storage.service';
import { interval, lastValueFrom, Observable, ReplaySubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { IUser, toUser } from './q-auth-model';
import { UserType } from 'src/app/consts/app.const';
import { QAvatar } from '../ui-kit/components/q-avatar/q-avatar.component';
import { StringUtil } from 'src/app/utils/string.utils';
import { environment } from 'src/environments/environment';
import { getMe, loggeedInUser, loginWithPassword, lookupWithPhone, UpdateUserInfo } from 'src/mock-data/user';
import { IWarehouse } from 'src/app/pages/employee/employee.model';

export interface IMe {
  user: IUser,
  warehouses?: IWarehouse[]
}

@Injectable({
  providedIn: 'root'
})
export class QAuthService {

  private bearerToken = '';
  private me$: Promise<IMe> = null;
  private autoRefreshToken: any;

  userAuthState$$ = new ReplaySubject<IUser | null>(null);

  constructor(
    private auth: AngularFireAuth,
    private http: HttpClient,
    private lsc: LocalStorageService,
    private cookieService: CookieService
  ) { }

  loginWithPhone(applicationVerifier: firebase.auth.RecaptchaVerifier, phoneNumber: string) {
    if (environment.dummy) {
      return Promise.resolve(Date.now());
    }
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    return phoneProvider.verifyPhoneNumber(phoneNumber, applicationVerifier);
  }

  verifyPhoneOTP(verificationID: string, otp: string) {
    if (environment.dummy) {
      return Promise.resolve({ user: { multiFactor: { user: { accessToken: Date.now() } } } });
    }
    const phoneCredential = firebase.auth.PhoneAuthProvider.credential(verificationID, otp);
    return this.auth.signInWithCredential(phoneCredential);
  }

  me(refresh?: boolean, queryParams = {}): Promise<IMe> {
    if (refresh) {
      this.me$ = null;
    }
    if (!this.me$ && this.isLoggedIn() && !environment.dummy) {
      this.me$ = lastValueFrom(this.http.get(`me`, { params: queryParams })).then(
        (res: any) => {
          return res;
        }
      );
    } else if (environment.dummy) {
      this.me$ = getMe();
    }
    return this.me$;
  }

  authState(): Observable<IUser | null> {
    return new Observable((subscribe) => {
      this.auth.onAuthStateChanged((user: any | null) => {
        const userInfo: IUser | null = toUser(user?._delegate);
        if (user) this.setBearerToken(user?._delegate?.accessToken);
        subscribe.next(userInfo);
        this.userAuthState$$.next(userInfo);
      });
    });
  }

  setIntervalForAutoRefreshingAuthToken() {
    // Refresh Auth token every 10(600000 - millis) minutes
    this.autoRefreshToken = interval(600000).subscribe(() => {
      this.refreshAuthToken();
    });
  }

  cancelAutoRefreshingAuthToken() {
    if (this.autoRefreshToken) this.autoRefreshToken.unsubscribe();
  }

  async refreshAuthToken(): Promise<void> {
    const currentUser = await this.auth.currentUser;
    if (currentUser) {
      console.log(`Refreshed Auth Token at ${new Date()}`)
      const authToken = await currentUser.getIdToken(true);
      this.setBearerToken(authToken);
    }
  }

  isLoggedIn(): boolean {
    const loggedIn = this.getBearerToken();
    return loggedIn ? true : false;
  }

  async logout(cb?) {
    this.me$ = Promise.resolve(null);
    this.resetBearerToken();
    if (environment.dummy) {
      Object.keys(localStorage).forEach(key => {
        if (key && !key.startsWith('dummy-')) {
          localStorage.removeItem(key);
        }
        localStorage.removeItem('dummy-logged-in-user');
      });
      cb ? cb() : '';
    } else {
      this.auth.signOut().then(() => {
        this.lsc.clear();
        this.autoRefreshToken?.unsubscribe();
        cb ? cb() : '';
      });
    }
  }


  async isSuperAdmin() {
    return await this.checkType(UserType.SUPER_ADMIN);
  }

  async isAdmin() {
    return await this.checkType(UserType.ADMIN);
  }

  async isEmployee() {
    return await this.checkType(UserType.EMPLOYEE);
  }

  async checkType(type: UserType) {
    const { user } = await this.me();
    return user?.type === type;
  }

  async hasAnyAccess(userTypes: UserType[]) {
    const { user } = await this.me();
    const exist = userTypes.includes(user?.type);
    return exist ? true : false;
  }

  setBearerToken(token: string) {
    this.bearerToken = token;
    this.lsc.set(LOCAL_STORAGE.AUTH_TOKEN, token);
  }

  getBearerToken(): string {
    return this.bearerToken || this.lsc.get(LOCAL_STORAGE.AUTH_TOKEN);
  }

  resetBearerToken(): void {
    this.bearerToken = "";
    this.lsc.remove(LOCAL_STORAGE.AUTH_TOKEN);
  }

  signInWithCustomToken(signInToken: string) {
    this.resetBearerToken();
    return this.auth.signInWithCustomToken(signInToken);
  }

  createCustomToken(data: any) {
    return this.http.post(`create-custom-token`, data);
  }

  getUserAvatar(user) {
    const avatar: QAvatar = {};
    if (user.image) {
      avatar.url = user.image.url;
    } else {
      avatar.label = StringUtil.avatarLabel(user.first_name);
    }
    return avatar;
  }

  lookupUserWithPhoneNumber(phone_number: string) {
    if (environment.dummy) {
      return lookupWithPhone(phone_number);
    }
    return this.http.post(`users/search`, { phone_number }, { observe: 'response' });
  }

  loginWithPassword(data: { username: string, password: string }) {
    if (environment.dummy) {
      return lastValueFrom(loginWithPassword(data.password, data.username));
    }
    return lastValueFrom(this.http.post(`auth/login`, data));
  }

  updatePersonalInfo(data) {
    if (environment.dummy) {
      const user = loggeedInUser();
      return UpdateUserInfo(data, user.id);
    }
    return lastValueFrom(this.http.post(`auth/me/update`, data));
  }
}
