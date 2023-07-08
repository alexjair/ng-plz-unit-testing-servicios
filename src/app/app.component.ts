import { Component } from '@angular/core';
import { Calulator } from './calculator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-testing-services';

  ngOnInit(){
    const calculator = new Calulator();
    const resp = calculator.multiply(3,3);
    console.log(resp === 9);

    const respdiv = calculator.divide(3,0);
    console.log(respdiv === null);
  }
}
