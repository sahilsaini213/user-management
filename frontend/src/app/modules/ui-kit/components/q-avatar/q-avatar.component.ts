import { Component,Input,OnChanges,OnInit, SimpleChanges } from '@angular/core';

export interface QAvatar {
  url?: string,
  label?: string,
  icon?: string,
  size?: string,
  shape?: string
}

@Component({
  selector: 'q-avatar',
  templateUrl: './q-avatar.component.html',
  styleUrls: ['./q-avatar.component.scss']
})
export class QAvatarComponent implements OnInit, OnChanges {
  private _defaultAvatar: QAvatar = {
    size: 'large',
    shape: 'circle',
    icon: 'pi pi-briefcase'
  }
  @Input() avatar: QAvatar;
  @Input() skeleton = false;
  constructor() { }

  ngOnInit(): void {
    this.mergeAvatarConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
     if(changes.avatar) {
        this.mergeAvatarConfig();
     }
  }

  mergeAvatarConfig() {
    this.avatar = {
      ...this._defaultAvatar,
      ...this.avatar
    }
  }

}
