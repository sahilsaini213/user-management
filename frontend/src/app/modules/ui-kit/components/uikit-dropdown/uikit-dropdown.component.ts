import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { 
  AbstractControl, ControlValueAccessor, 
  NG_VALIDATORS, NG_VALUE_ACCESSOR, 
  ValidationErrors, Validator 
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiKitService } from '../../ui-kit.service';

export interface IUIKitDropdown {
  label: string,
  options?: any[],
  url?: string,
  service?: any,
  optionLabel?: string,
  optionValue?: string
}

@Component({
  selector: 'uikit-dropdown',
  templateUrl: './uikit-dropdown.component.html',
  styleUrls: ['./uikit-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: UikitDropdownComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: UikitDropdownComponent
    }
  ]
})
export class UikitDropdownComponent implements OnInit, ControlValueAccessor, Validator, OnDestroy {
  private _defaultConfig = {
    options: [],
    url: '',
    optionLabel: 'name',
    optionValue: 'id'
  };
  options = [];
  disabled = false;
  private onTouched: () => void;
  private onChanged: (value) => void;
  private onValidatorChanged: () => void;
  touched = false;
  dirty = false;
  isValid = true;
  @Input() value;
  @Output() valueChange = new EventEmitter();
  @Input() config: IUIKitDropdown;
  subscriptionRef: Subscription;
  constructor(private uiKitService: UiKitService) { }

  ngOnInit(): void {
    this.config = {
      ...this._defaultConfig,
      ...this.config
    }
    let req;
    if(this.config.url) {
      req = this.uiKitService.getRequest(this.config.url);
    } else if(this.config.service) {
      req = this.config.service.list();
    }
    if(req) {
      this.subscriptionRef = req.subscribe( (res: any) => {
        this.options = res?.list || res || [];
      });
    }
  }

  detectChanges() {
    this.markAsTouched();
    this.onValueChange();
    this.isValid = this.doValidate();
  }

  writeValue(value: string): void {
    this.value = value || null;
    this.valueChange.emit(this.value);
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

  validate(control: AbstractControl<any, any>): ValidationErrors {
    this.isValid = this.doValidate();
    if (this.isValid) {
      return null;
    } else {
      if (this.value?.length) {
        return {
          invalid: true
        }
      } else {
        return {
          required: true
        }
      }
    }
  }

  doValidate() {
    const txt = this.value;
    return (this.value) ? true : false;
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

  onValueChange() {
    this.writeValue(this.value);
    this.markAsDirty();
    this.onValidatorChanged();
    this.onChanged(this.value);
  }

  ngOnDestroy(): void {
    this.subscriptionRef?.unsubscribe();
  }

}
