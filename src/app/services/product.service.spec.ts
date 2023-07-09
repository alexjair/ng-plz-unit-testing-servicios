import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { environment } from './../../environments/environment';
import { generateManyProducts } from '../models/product.mock';

fdescribe( 'Product.Service.spec.ts' ,()=>{

  let productsService: ProductsService;
  let httpController: HttpTestingController; // para smcking desde controller

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ ProductsService]
    });
    productsService = TestBed.inject(ProductsService );
    httpController = TestBed.inject(HttpTestingController );
  });

  it('Debe de estar creado', ()=>{
    expect(productsService).toBeTruthy();
  });

  describe('Test para metodo getAllProducts()',()=>{
    it('Deberia retornar a "Product List"',(doneFn)=>{
      //Arrage
      //forma automatica
      const mockData: Product[] = generateManyProducts(2) //1,2,3, default 10

      /*
      //forma manual de generar obj
      const mockData: Product[] = [
        {
          id: '123',
          title: 'title',
          price: 12,
          description: 'blabla',
          category: {
            id: 112,
            name: 'as'
          },
          images: ['img','img']
        }
      ];
      */
      //Act
      productsService.getAllSimple().
        subscribe( (data)=>{
          //Assert
          expect(data.length).toEqual(mockData.length);
          expect(data).toEqual(mockData);
          doneFn();
      });

      //http condifg
      const url = `${environment.API_URL}/api/v1/products`;
      const request = httpController.expectOne(url);
      request.flush(mockData);
      httpController.verify();
    });

  });

});
