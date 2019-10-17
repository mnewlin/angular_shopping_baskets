/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { OrderService } from "./order.service";
import { HttpClientModule } from '@angular/common/http';

describe("Service: Order", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [OrderService]
    });
  });

  it("should ...", inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));
});
