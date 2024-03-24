import { Injectable, Type } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DeviceDetectorService {

    constructor() { }

    deviceBreakpoint() {
        const vw = this.viewport().width;
        if(vw < 768) {
            return 'qb-sm';
        } else if(vw >= 768 && vw < 992) {
            return 'qb-md';
        } else if(vw >= 992 && vw < 1200) {
            return 'qb-lg';
        } else if(vw >= 1200 && vw < 1400) {
            return 'qb-xl';
        } else {
            return 'qb-xxl';
        }
    }

    viewport() {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        return {
            height: h,
            width: w
        }
    }
}