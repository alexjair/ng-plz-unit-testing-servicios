import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  constructor() { }

  private value = 'my value';

  getValue() {
    return this.value;
  }

  setValue (value: string) {
    this.value = value;
  }

  getPromiseValue() {
    return Promise.resolve('Promise Value');
  }

  getObservableValue() {
    return of('Observable value');
  }

}
