import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface IImage {
  url: string,
  size: number,
  name: string
}

@Component({
  selector: 'uikit-image',
  templateUrl: './uikit-image.component.html',
  styleUrls: ['./uikit-image.component.scss']
})
export class UikitImageComponent implements OnInit {
  selected = true;
  images: IImage[] = [];
  @Input() maxLimit = 1;
  @Output() onChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  toBase64(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  setPreUploadedImages(images: IImage[]) {
    this.images = images;
    this.onChange.emit(this.images);
  }

  async onImageSelect(imageRef) {
    const selectedImages = await Promise.all([...imageRef.files].map(async (file) => {
      return { url: await this.toBase64(file), name: file.name, size: file.size };
    }));
    this.images = [
      ...this.images,
      ...selectedImages
    ];
    this.onChange.emit(this.images);
  }

  removeImage(indx, all = false) {
    if (all) {
      this.images = [];
    } else {
      this.images.splice(indx, 1);
    }
    this.onChange.emit(this.images);
  }

}
