import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  private array = [];

  constructor() { }

  save(array) {
    this.array = array;
  }

  fetch() {
    return this.array;
  }
}
