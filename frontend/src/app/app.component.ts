import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { QAuthService } from './modules/q-auth/q-auth.service';
import * as AOS from 'aos';
import { DeviceDetectorService } from './service/device-detector.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit, OnDestroy{

    private authSubscription: any;
    progressSpinner = true;
    constructor(
        private qAuthService: QAuthService,
        private deviceService: DeviceDetectorService
    ) {
        // this.subscribeToFirebaseAuthEvents();
        this.onResize();
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        const bodyTag = document.getElementsByTagName('body')[0];
        const breakpoint = this.deviceService.deviceBreakpoint();
        bodyTag.className = `${breakpoint}`;
    }

    
    ngOnInit() {
        document.documentElement.style.fontSize = '14px';
    }

    ngAfterViewInit(): void {
        AOS.init({
            duration: 1500,
            once: false,
            mirror:true,
        });
    }

    onActivate(e) {
      this.progressSpinner = false;
    }

    ngOnDestroy(): void {
        if(this.authSubscription) this.authSubscription.unsubscribe();
    }
}
