import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Product } from "../models/product";
import { Observable } from "rxjs";
// tslint:disable-next-line: typedef
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: "root"
})
export class ProductService {

  constructor(private http: HttpClient) { }
  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + "/products");
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(API_URL + "/products", product);
  }


  public getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(API_URL + "/products/" + productId);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(API_URL + "/products/" + product.id, product);
  }

  public deleteProductById(productId: number): Observable<null> {
    return this.http.delete<null>(API_URL + "/products/" + productId);
  }
}
