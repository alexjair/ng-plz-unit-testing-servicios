import { Injectable } from '@angular/core';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
    private valueService: ValueService
  ) { }

  getValue() {
    //this.valueService.getValue(); /error de 2 lamadas
    return this.valueService.getValue();
    //return 'fake value'; //error de no llamar al call
  }
}
