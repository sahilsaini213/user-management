import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    
    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    setObject(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string, def?: string): string {
        return localStorage.getItem(key) || def;
    }

    getObject(key: string, def?: any): any {
        const val = this.get(key) || '';
        return this.has(key) ? JSON.parse(val) : def;
    }

    pop(key: string) {
        const value = localStorage.getItem(key);
        this.remove(key);
        return value;
    }

    popObject(key: string) {
        const value = this.getObject(key);
        this.remove(key);
        return value;
    }

    has(key: string): boolean {
        const value = localStorage.getItem(key);
        return value != null && value.trim().length > 0;
    }

    hasValue(key: string, defValue: string) {
        const value = localStorage.getItem(key);
        return value && value === defValue;
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}

export enum LOCAL_STORAGE{
    APP_BASE_URL = 'app-base-url',
    AUTH_TOKEN = 'hwims-secure-token'
}
