import { Component, OnInit } from "@angular/core";
import { products } from "../products";
import { Order } from "../shared/models/order";
import { OrderService } from "../shared/service/order.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  products = products;
  order: Order;

  orderList: Order[] = [];
  constructor(private orderservice: OrderService) { }
  ngOnInit(): void {
    this.orderservice.getAllOrders().subscribe(data => this.orderList = data);

  }
  onChange(value: string): void {
    this.orderservice.getOrderById(Number(value)).subscribe(data => this.order = data);
  }

}


