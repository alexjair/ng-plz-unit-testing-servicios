export class Calulator {
  multiply (a: number, b: number){
    return a * b;
  }

  divide(a: number, b: number){
    if(b === 0){
      return null;
      //return undefined;
    }
    return a /b ;
  }
}
