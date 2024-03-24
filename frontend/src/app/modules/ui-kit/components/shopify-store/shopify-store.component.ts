import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'shopify-store',
  templateUrl: './shopify-store.component.html',
  styleUrls: ['./shopify-store.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => ShopifyStoreComponent)
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => ShopifyStoreComponent),
    multi: true,
  },]
})
export class ShopifyStoreComponent implements OnInit, ControlValueAccessor, Validator {

  private onTouched: () => void;
  private onChanged: (value: string) => void;
  private onValidatorChanged: any = () => { };

  touched = false;
  isValid: boolean;
  dirty = false;

  @Input() label = 'Shopify Store';
  @Input() placeholder = 'example';
  @Input() disabled = false;
  @Input() required = true;

  private _value: string;
  get value() {
    return this._value;
  }
  set value(value: any) {
    this._value = value;
    this.detectChanges();
    this.onChanged(`${this.value}.myshopify.com`);
    this.markAsDirty();
    this.onValidatorChanged();
  }

  constructor() { }

  ngOnInit(): void { }

  writeValue(value: string): void {
    this._value = value || '';
  }

  registerOnChange(onChanged: any): void {
    this.onChanged = onChanged;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.isValid = this.doValidate();
    if (this.isValid) {
      return null;
    } else {
      if(this.value.length){
        return {
          email : {
            invalid: true
          }
        }
      } else {
        return {
          email : {
            required: true
          }
        }
      }
    }
  }

  registerOnValidatorChange?(onValidatorChanged: () => void): void {
    this.onValidatorChanged = onValidatorChanged;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  markAsDirty() {
    if (!this.dirty) {
      this.dirty = true;
    }
  }

  detectChanges() {
    this.markAsTouched();
    this.isValid = this.doValidate();
  }


  doValidate() {
        return this.isValidStore();
  }

  isValidStore() {
    return /^[a-zA-Z0-9][a-zA-Z0-9-]*/.test(this.value);
  }

}
