import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { PhoneUtil } from 'src/app/utils/phone.utils';

export enum MultiInputMode {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  ALL = 'ALL'
}

@Component({
  selector: 'multi-input',
  templateUrl: './multi-input.component.html',
  styleUrls: ['./multi-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => MultiInputComponent)
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MultiInputComponent),
    multi: true,
  },]
})
export class MultiInputComponent implements OnInit, ControlValueAccessor, Validator {

  private onTouched: () => void;
  private onChanged: (value: string) => void;
  private onValidatorChanged: any = () => { };

  countryCodes: MenuItem[] = [
    { label: 'IN (+91)', id: '+91', command: ({ item }) => this.setCountryCode(item) },
    { label: 'US (+1)', id: '+1', command: ({ item }) => this.setCountryCode(item) }
  ];

  touched = false;
  isEmail: boolean;
  isPhone: boolean;
  isValid: boolean;
  dirty = false;

  @Input() label = 'Email / Phone';
  @Input() disabled = false;
  @Input() required = true;
  @Input() countryCode = this.countryCodes[0];
  @Input() mode: MultiInputMode = MultiInputMode.ALL;

  private _value: string;
  get value() {
    return this._value;
  }
  set value(value: any) {
    this._value = value;
    this.detectChanges();
    this.onChanged(this.isEmail ? this.value : `${this.countryCode.id}${this.value}`);
    this.markAsDirty();
    this.onValidatorChanged();

  }

  constructor() { }

  ngOnInit(): void {
    this.detectMode();
  }

  writeValue(value: string): void {
    if(value && this.isPhone && value.startsWith('+')) {
      this.countryCodes.forEach( country => {
        value = value.replace(country.id, '');
      })
    }
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
      if(this.isEmail){
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
      } else {
        if(this.value.length){
          return {
            phone_number : {
              invalid: true
            }
          }
        } else {
          return {
            phone_number : {
              required: true
            }
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
    this.detectMode();
    this.isValid = this.doValidate();
  }

  setCountryCode(item: MenuItem): void {
    this.countryCode = item;
    this.value = this.value;
  }

  doValidate() {
    switch (this.mode) {
      case MultiInputMode.PHONE:
        return PhoneUtil.isPhone(this.value);
      case MultiInputMode.EMAIL:
        return this.validEmail();
      default:
        return this.isPhone ? PhoneUtil.isPhone(this.value) : this.validEmail();
    }
  }

  validEmail() {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.value);
  }

  detectMode() {
    if (this.mode == MultiInputMode.PHONE) {
      this.setPhoneMode();
    } else if (this.mode == MultiInputMode.EMAIL) {
      this.setEmailMode();
    } else if (this.mode == MultiInputMode.ALL) {
      this.isNumeric() ? this.setPhoneMode() : this.setEmailMode();
    }
  }

  setPhoneMode() {
    this.isPhone = true;
    this.isEmail = false;
  }

  setEmailMode() {
    this.isPhone = false;
    this.isEmail = true;
  }

  isNumeric() {
    return /^[0-9]{1,10}/.test(this.value);
  }

}
