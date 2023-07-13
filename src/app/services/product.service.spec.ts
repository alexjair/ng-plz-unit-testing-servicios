import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpStatusCode } from '@angular/common/http';

import { ProductsService } from './products.service';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from './../../environments/environment';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';

describe( 'Product.Service.spec.ts' ,()=>{

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


  afterEach(() => {
    httpController.verify();
  });

  it('Debe de estar creado', ()=>{
    expect(productsService).toBeTruthy();
  });

  describe('Test para metodo getAllSimple()',()=>{

    it('Deberia enviar consulta "Params, limit 10 y offset 3"', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      //Act
      productsService.getAll(limit, offset)
      .subscribe((data)=> {
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      //httpController.verify();
    });

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
      //httpController.verify();
    });


  });


  describe('tests for getAll()', () => {

    it('Deberia retornar Product List', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productsService.getAll()
      .subscribe((data)=> {
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      //httpController.verify();
    });

    it('Deberia retornanr Product list with impuestos', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, //100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, //200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, //0 * .19 = 0
        },
        {
          ...generateOneProduct(),
          price: -100, // = 0
        },
      ];
      //Act
      productsService.getAll()
      .subscribe((data)=> {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      //httpController.verify();
    });

  });

  describe('Test para "create()"', () => {

    it('Deberia retornar a Nuevo Product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new Product',
        price: 100,
        images: ['img'],
        description: 'bla bla bla',
        categoryId: 12
      }
      // Act
      productsService.create({...dto})
      .subscribe(data => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
      //httpController.verify();
    });

  });

  describe('Test para update()', () => {
    it('Deberia "Update a product"', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      // UpdateProductDTO
      const dto: UpdateProductDTO = {
        title: 'new product',
      }
      const productId = '1';
      // Act
      //productsService.update(productId, dto) // mala parctica,
      productsService.update(productId, {...dto}) // enviar elementos sinm mutaciones
      .subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockData);
    });
  });

  describe('Test para delete()', () => {
    it('Deberia "Delete a product"', (doneFn) => {
      // Arrange
      const mockData = true;
      const productId = '1';
      // Act
      productsService.delete(productId)
      .subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockData);
    });
  });

  describe('Test para "getOne() y Errores HTTP 404,401,409"', () => {
    it('Deberia retornar a Product', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      const productId = '1';
      // Act
      productsService.getOne(productId)
      .subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    });

    it('Deberia retornarme el Correcto Msg con el "Status code is 404"', (doneFn) => {
      // Arrange
      const productId = '1';
      const msgError = '404 message';

      const mockError = {
        status: HttpStatusCode.NotFound, //aqui te salen todas las opciones de status code
        statusText: msgError
      };
      // Act
      productsService.getOne(productId)
      .subscribe({
        error: (error) => {
          // assert
          expect(error).toEqual('El producto no existe');
          doneFn();
        }
      });

      // productsService.getOne(productId)
      // .subscribe(null, (error) => {
      //   expect(error).toEqual('El producto no existe');
      //   doneFn();
      // });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      //cambia los parametros
      req.flush(msgError, mockError);
    });

    it('should return the right msg when the status code is 409', (doneFn) => {
      // Arrange
      const id = '1';
      const msgError = '409 message';
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: msgError,
      };
      // Act
      productsService.getOne(id).subscribe({
        error: (error) => {
          // assert
          expect(error).toEqual('Algo esta fallando en el server');
          doneFn();
        },
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });

    it('should return the right msg when the status code is 401', (doneFn) => {
      // Arrange
      const id = '1';
      const msgError = '409 message';
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgError,
      };
      // Act
      productsService.getOne(id).subscribe({
        error: (error) => {
          // assert
          expect(error).toEqual('No estas permitido');
          doneFn();
        },
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });

  });

});
