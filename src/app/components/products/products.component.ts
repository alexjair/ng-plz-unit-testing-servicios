import { Component, OnInit } from '@angular/core';

import { ProductsService } from './../../services/products.service'
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private productsService: ProductsService
  ) { }

  products: Product[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productsService.getAllSimple()
      .subscribe( products =>{
        this.products = products;
      });
  }

}
