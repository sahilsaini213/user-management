import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class RouteService {

    constructor(
        private router: Router
    ) { }

    navigate(url: string, options = {}) {
        this.router.navigate([this.formatUrl(url)], { ...options });
    }

    navigateWithMerge(url: string, options = {}) {
        this.navigate(url, { queryParamsHandling: 'merge', ...options });
    }

    navigateWithPreserve(url: string, options = {}) {
        this.navigate(url, { queryParamsHandling: 'preserve', ...options });
    }

    navigateByURL(url: string) {
        this.router.navigateByUrl(this.formatUrl(url));
    }

    private formatUrl(url: string) {
        return url.startsWith("/") || url.startsWith(".") ? url : `/${url}`;
    }

}