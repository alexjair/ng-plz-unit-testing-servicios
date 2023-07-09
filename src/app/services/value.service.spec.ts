//TESTING DE ANGULAR
import { TestBed } from '@angular/core/testing'; //por ahora no se va usar

//BASIC
import { ValueService } from './value.service'; //
import { firstValueFrom } from 'rxjs';

describe('Value.Service.ts', () => {
  let service: ValueService;

  //Va ejecutar una sentecia de codigo antes de cada nueva prueba
  beforeEach( ()=>{

    TestBed.configureTestingModule({
      //Estamos testeando ValueService
      providers: [ //puede ir Componente, Service, rrouting
        ValueService
      ]
    });

    //usar la instancia de TestBed de Angular
    service = TestBed.inject(ValueService);

    //usar la instancia verdadera
    //service = new ValueService();
  });

  it('Debe de estar creado ->', ()=>{
    expect(service).toBeTruthy();
  });

  describe('Tests para getValue():' ,()=> {
    it('Deberia retornar "my value"', ()=>{
      expect(service.getValue()).toBe("my value");
    })

  });

  describe('Tests para setValue():' ,()=> {
    it('Deberia cambiar el valor', ()=>{
      expect(service.getValue()).toBe("my value");
      service.setValue('change');
      expect(service.getValue()).toBe("change");
    })
  });

  describe('Tests para getPromiseValue():' ,()=> {
    it('Deberia retornar "Promise value" desde una promesa con "then"', (doneFn)=>{
      service.getPromiseValue()
      .then((value)=>{
        expect(value).toBe('Promise Value');
        doneFn();
      });
    });

    it('Deberia retornar "Promise value" desde una promesa usando "async"', async ()=>{
      const resp = await service.getPromiseValue();
      expect(resp).toBe('Promise Value');
    });
  });

  describe('Test para getObservableValue():', () => {
    it('Deberia retornar "my value" usando "subscribe"', (doneFn) => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('Observable value');
        doneFn();
      });
    });

    it('Deberia retornar "my value" usando "async"', async () => {
      const value = await firstValueFrom(service.getObservableValue());
      expect(value).toBe('Observable value');
    });
  })

});
