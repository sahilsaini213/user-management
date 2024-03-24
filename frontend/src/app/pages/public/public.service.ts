import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor() { }

  save({ name, phone_number, message }) {
  return of (window.open(`mailto:hawkersoftwares@gmail.com?subject=QUERY || ${name.toUpperCase()} || 
    ${phone_number}&body=Hi Team,%0D%0A ${message} %0D%0A %0D%0A`));
  }
  
}
