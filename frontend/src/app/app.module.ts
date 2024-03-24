import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgPrimeModule } from './modules/ng-prime/ng-prime.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CookieService } from 'ngx-cookie-service';
import { APP_INTERCEPTORS } from './interceptors';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        NgPrimeModule,
        // provideFirebaseApp(() => initializeApp(environment.firebase)),
        // provideAnalytics(() => getAnalytics()),
        // provideAuth(() => getAuth())
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        AngularFireAuthGuard, ScreenTrackingService, UserTrackingService, MessageService, DialogService, CookieService,
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        ...APP_INTERCEPTORS
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
