import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Order } from "../models/order";
import { Observable } from "rxjs";
// tslint:disable-next-line: typedef
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: "root"
})
export class OrderService {

  constructor(private http: HttpClient) { }
  public getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(API_URL + "/orders");
  }

  public createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(API_URL + "/orders", order);
  }


  public getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(API_URL + "/orders/" + orderId);
  }

  public updateProduct(order: Order): Observable<Order> {
    return this.http.put<Order>(API_URL + "/orders/" + order.invoiceNumber, order);
  }

  public deleteProductById(invoiceNo: number): Observable<null> {
    return this.http.delete<null>(API_URL + "/orders/" + invoiceNo);
  }
}
