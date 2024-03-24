import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormControlService {

    SHOPIFY_STORE_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]*.myshopify.com/;
    NUMBER_REGEX = /^\d*$/;
    URL_REGEX = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator

    getShopifyStoreNameControl(defValue?: string): FormControl {
        return new FormControl(defValue, [
            Validators.required,
            Validators.pattern(this.SHOPIFY_STORE_REGEX)
        ]);
    }

    getNameControl(defValue?: string): FormControl {
        return this.getStringTypeFormControl({defValue});
    }

    getNumberControl(defValue?: number): FormControl {
        return this.getNumberTypeFormControl({defValue});
    }

    getDescriptionControl(defValue?: string, config = {}): FormControl {
        return this.getStringTypeFormControl({defValue, ...config});
    }

    getEmailControl(defValue?: string): FormControl {
        return new FormControl(defValue, [
            Validators.required,
            Validators.email
        ]);
    }

    getOTPControl(defValue?: string): FormControl {
        return new FormControl(defValue, [
            Validators.required,
            Validators.pattern(this.NUMBER_REGEX),
            Validators.minLength(6),
            Validators.maxLength(6)
        ]);
    }

    getURLControl(defValue?: string): FormControl {
        return new FormControl(defValue, [
            Validators.required,
            Validators.pattern(this.URL_REGEX)
        ]);
    }

    getMultiInputControl(defValue?: string): FormControl {
        return this.getFormControl(defValue);
    }

    getFormControl(defValue?: any, validators = []): FormControl {
        return new FormControl(defValue, validators);
    }

    getDateControl(defValue?: Date | null, validators = []): FormControl {
        return new FormControl(defValue, validators);
    }

    getBooleanControl(defValue: Boolean = false): FormControl {
        return new FormControl(defValue);
    }

    getStringTypeFormControl(config: StringFormControlConfig): FormControl {
        return new FormControl(config.defValue, [
            Validators.required,
            Validators.minLength(config.minLength || 2),
            Validators.maxLength(config.maxLength || 50)
        ]);
    }

    getNumberTypeFormControl(config: NumberFormControlConfig): FormControl {
        return new FormControl(config.defValue, [
            Validators.required,
            Validators.min(config.minValue|| 0),
            Validators.max(config.maxValue || 999999999)
        ]);
    }
}

export interface FormControlConfig {
    defValue?: any
}

export interface StringFormControlConfig extends FormControlConfig {
    minLength?: number,
    maxLength?: number
}

export interface NumberFormControlConfig extends FormControlConfig {
    minValue?: number,
    maxValue?: number
}