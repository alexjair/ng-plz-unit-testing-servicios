//Importar la Clase que queremos evaluar, el componenete.
import {Calulator} from './calculator'

//inicio de la funcion evaluador 'describe()'
xdescribe('Testing para Calculator', ()=>{

  describe('Testing para Multiply=>', ()=>{
      //PRIMERA PRUEBA
      //el titulo deberia ser una historia
      it('#multiply() :: Deberia retornar un 9', () =>{
        //Esctructura interna del test.

        //AAA
        //... aun no definio que hace este apartado

        //Arrange/ Preparar
        const calculator = new Calulator();

        //Act/ Actuar
        const resp = calculator.multiply(3,3);

        //Assert / resuelvo hipotesis
        expect(resp).toEqual(9);

      })

    //SEGUNDA PRUEBA
    //el titulo deberia ser una historia
    it('#multiply() :: Deberia retornar un 9', () =>{
      //Esctructura interna del test.

      //AAA
      //... aun no definio que hace este apartado

      //Arrange/ Preparar
      const calculator = new Calulator();

      //Act/ Actuar
      const resp = calculator.multiply(1,4);

      //Assert / resuelvo hipotesis
      expect(resp).toEqual(4);

    })

  });

  describe('Testing para Dividir=>', ()=>{

      //3ER PRUEBA
      //el titulo deberia ser una historia
      it('#divide() :: Deberia retornar un 9', () =>{
        //Esctructura interna del test.

        //AAA
        //... aun no definio que hace este apartado

        //Arrange/ Preparar
        const calculator = new Calulator();

        //Act/ Actuar
        expect( calculator.divide(6,3)).toEqual(2);
        expect( calculator.divide(5,2)).toEqual(2.5);

        //Assert / resuelvo hipotesis
      })

      it('#divide for a zero', () =>{
        //Esctructura interna del test.
        //AAA
        //... aun no definio que hace este apartado
        //Arrange/ Preparar
        const calculator = new Calulator();
        //Act/ Actuar
        expect( calculator.divide(6,0)).toBeNull();
        expect( calculator.divide(5,0)).toBeNull();
        expect( calculator.divide(234234324325,0)).toBeNull();
        //Assert / resuelvo hipotesis
      });

      //4ta PRUEBA
      //el titulo deberia ser una historia
      it('test matchers', () =>{
        let name = 'jair';
        let name2;

        //PRUEBAS DEFINIDAS
        expect(name).toBeDefined();
        expect(name2).toBeUndefined();

        //pruebas operacionales
        expect(1 + 3 === 4).toBeTruthy(); //verificar true
        expect(1 + 1 === 3).toBeFalsy(); //verificar false

        expect(5).toBeLessThan(10); //mas pequeño de..
        expect(20).toBeGreaterThan(10); //mas grande de..

        expect('123456').toMatch(/123/); //ExpReg
        expect(['apless','orages','pears']).toContain('orages');

      });
  });

});
