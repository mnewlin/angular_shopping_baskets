/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { ProductService } from "./product.service";
import { HttpClientModule } from '@angular/common/http';

describe("Service: Product", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductService]
    });
  });

  it("should ...", inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
  it('should return an ProductList',
    inject([ProductService], (productService) => {

      productService.getAllProducts().subscribe((products) => {
        expect(products.length).toBeGreaterThan(9);
      });
    }));
});
