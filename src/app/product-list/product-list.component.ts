import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router'
import { products } from "../products";
import { Order } from "../shared/models/order";
import { OrderService } from "../shared/service/order.service";
import { filter } from 'rxjs/operators';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  products = products;
  order: Order;

  orderList: Order[] = [];
  constructor(private orderservice: OrderService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams
      .pipe(filter(params => params.id))
      .subscribe(params => {
        if (params)
          this.onChange(params.id);
      })
    this.orderservice.getAllOrders().subscribe(data => this.orderList = data);

  }
  onChange(value: string): void {
    this.orderservice.getOrderById(Number(value)).subscribe(data => this.order = data);
  }

}


