import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { QThemeConfig } from '.';

@Injectable({providedIn: 'root'})
export class QThemeService {

    config: QThemeConfig = {
        theme: 'lara-light-teal',
        dark: false,
        inputStyle: 'outlined',
        ripple: true,
        menuMode: 'static'
    };

    private configUpdate = new Subject<QThemeConfig>();

    configUpdate$ = this.configUpdate.asObservable();

    updateConfig(config: QThemeConfig) {
        this.config = config;
        this.configUpdate.next(config);
    }

    getConfig() {
        return this.config;
    }

    isStatic() {
        return this.config.menuMode === 'static';
    }

    isOverlay() {
        return this.config.menuMode === 'overlay';
    }

}
