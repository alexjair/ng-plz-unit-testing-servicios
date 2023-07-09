import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './value-fake.service';

describe('Master.Service.ts', () => {

  let masterService: MasterService;
  //spy
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj<ValueService> ('ValueService',['getValue']);

    TestBed.configureTestingModule({
      providers: [ MasterService,
        { provide: ValueService, useValue: spy }
      ]
    });
    masterService = TestBed.inject(MasterService );
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('Debe de estar creado', ()=>{
    expect(masterService).toBeTruthy();
  });

  /*
  //Ya no es necesario estas pruebas
  it('Deberia retornar "my value" desde el "real|origen" servicio', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('my value');
  });

  it('Deberia retornar "other value" desde el "fake servicio"', () => {
    const fakeValueService = new FakeValueService();
    const masterService = new MasterService(fakeValueService as unknown as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });

  it('Deberia retornar "other value" desde el "fake [object]"', () => {
    const fake = { getValue: () => { return 'fake from obj' }};
    //contniua
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake from obj');
  });
  */

  //objetivo: Seria realmente en el getValue() de master service, seta ejecutando el getValue() a partir de ValueService??

  //ESPIA
  //lo importante es llamar, "Spy"
  /*
  it('Deberia "call" a getValue() desde nuestro "ValueService"', () => {

    //CREACION DEL Mock :
      //desdes jasmine o framework de testing.

      //const valueServiceSpy = jasmine.createSpyObj('ValueService',['getValue'])// "service | [metodos1, metodos2,...]" //metodos son del servicio
      //const valueServiceSpy: jasmine.SpyObj<ValueService> = jasmine.createSpyObj('ValueService',['getValue'])// TIPADO DORRECT
      const valueServiceSpy = jasmine.createSpyObj<ValueService> ('ValueService',['getValue'])// TIPADO DORRECT V2

      //yo quiero que retoen un moks
      valueServiceSpy.getValue.and.returnValue('fake value');

    //continua
    const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe('fake value');//para saber si es llamado el metodo
    expect(valueServiceSpy.getValue).toHaveBeenCalled();//para saber si es llamado el metodo
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);//para saber cuantas veces fue llamado el metodo

  });
  */


  it('Deberia "call" a getValue() desde nuestro "ValueService" - TestBed', () => {

    //CREACION DEL Mock :
      const valueServiceSpy = jasmine.createSpyObj<ValueService> ('ValueService',['getValue'])// TIPADO DORRECT V2
      valueServiceSpy.getValue.and.returnValue('fake value');

    //continua
    const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe('fake value');//para test el metodo..

    //si arriba fue exitoso seguir::
    expect(valueServiceSpy.getValue).toHaveBeenCalled();//para saber si es llamado el metodo
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);//para saber cuantas veces fue llamado el metodo

  });


});
