import { Component, OnInit } from "@angular/core";
import { Product } from "../shared/models/product";
import { NotifierService } from "angular-notifier";
import { Cart } from "../shared/models/cart";
import { Constants } from "../shared/Constants";
import { Order } from "../shared/models/order";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromRoot from "../reducers";
import { GetProductList } from "../actions/product.actions";
import { GetOrderList } from "../actions/orders.actions";
import * as fromActions from "../actions/order.actions";
import { ofType, Actions } from "@ngrx/effects";
@Component({
  selector: "app-shoppingcart",
  templateUrl: "./shoppingcart.component.html",
  styleUrls: ["./shoppingcart.component.css"]
})
export class ShoppingcartComponent implements OnInit {

  products: Product[];
  selectedProduct: Product;
  selectedProductId: any;
  selectedQty: number;
  unitPrice: any;
  selectedPrice: any;
  examptedCategories: String[] = ["candy", "popcorn", "coffee"];
  cartitems: Cart[] = [];
  salesTax: number;
  orderTotal: number;
  subTotal: number;
  orderlist: Order[] = [];
  constructor(private router: Router,
    private _actions$: Actions,
    public store: Store<fromRoot.IState>,
    private notifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetProductList());
    this.store.dispatch(new GetOrderList());
    this.store.select(fromRoot.getProducts).subscribe(k => this.products = k);
    this.store.select(fromRoot.getorders).subscribe(k => this.orderlist = k);

  }

  ChangeProduct(): void {
    this.selectedProduct = this.products.find(p => p.id === Number(this.selectedProductId));
    this.unitPrice =this.selectedProduct.price;
    if (this.selectedQty && this.selectedQty > 0) {
      this.selectedPrice = this.selectedQty * this.selectedProduct.price;
    } else {
      this.selectedPrice = this.selectedProduct.price;
    }
  }

  addProduct(): void {
    if (!this.selectedProductId) {
      this.notifierService.notify("error", "Please select product");
      return;
    }
    if (!this.selectedQty || this.selectedQty === 0) {
      this.notifierService.notify("error", "Please enter quantity");
      return;
    }

    let cart: Cart = new Cart();
    cart.id = Symbol();
    cart.product = this.selectedProduct;
    cart.quantity = this.selectedQty;
    cart.totalPrice = this.selectedPrice;
    cart.salesTax = 0;
    cart.salesTaxPer = 0;
    cart.importTaxPer = 0;

    this.cartitems.push(cart);
    this.cartitems = this.calculateTax(this.cartitems);

  }
  calculateTax(cartitem: Cart[]): Cart[] {
    // calculate tax based on categories and imports with Constant percentage;
    cartitem.forEach((element: Cart) => {
      element.salesTax = 0;
      element.totalPrice = Number(element.totalPrice.toFixed(2));
      if (!(this.examptedCategories.includes(element.product.category))) {
        // element.salesTax = +(Math.ceil(((element.totalPrice * Constants.salesTax) / 100) * 20 - .05) /20).toFixed(2);
        element.salesTax = +(this.multipleOfFive(element.totalPrice, Constants.salesTax));
        element.salesTaxPer = Constants.salesTax;


      }
      if (element.product.imported) {
        // element.salesTax += +(Math.ceil(((element.totalPrice * Constants.importDuty) / 100) * 20 - .05) / 20).toFixed(2);
        element.salesTax += +(this.multipleOfFive(element.totalPrice, Constants.importDuty));
        element.salesTax = +element.salesTax.toFixed(2);
        element.importTaxPer = Constants.importDuty;
      }
      element.priceWithTax = Number((element.totalPrice + element.salesTax).toFixed(2));

    });
    this.salesTax = +(cartitem.reduce((sum, current) => sum + current.salesTax, 0)).toFixed(2);
    this.subTotal = +(cartitem.reduce((sum, current) => sum + current.totalPrice, 0)).toFixed(2);
    this.orderTotal = +(cartitem.reduce((sum, current) => sum + current.priceWithTax, 0)).toFixed(2);
    return cartitem;
  }

  // tslint:disable-next-line: typedef
  multipleOfFive(price, tax) {
    return (Math.ceil(((price * tax) / 100) * 20 - .05) / 20).toFixed(2);
  }

  updateQty(item: Cart, event: any): void {
    let cartItme: Cart = this.cartitems.find(i => i.id === item.id);
    cartItme.quantity = +event.srcElement.value;
    cartItme.totalPrice = cartItme.product.price * cartItme.quantity;
    this.cartitems = this.calculateTax(this.cartitems);
  }
  remove(i: number): void {
    this.cartitems.splice(i, 1);
    this.cartitems = this.calculateTax(this.cartitems);
  }
  addOrder(): void {
    if (this.cartitems.length > 0) {
      let order: Order = new Order();
      order.invoiceNumber = this.orderlist.length + 1;
      order.invoiceTo = "John Smith";
      order.cartItimes = this.cartitems;
      order.dueDate = this.addDays(new Date(), 10);
      order.invoiceDate = new Date();
      order.orderTotal = this.orderTotal;
      order.salesTax = this.salesTax;
      order.subTotal = this.subTotal;
      this.createOrder(order);
      // this.orderService.createOrder(order).subscribe(d => {

      // });
    }

  }
  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
  createOrder(order: Order): void {
    this.store.dispatch(new fromActions.AddOrderAction(order));
    this._actions$.pipe(ofType(fromActions.ActionTypes.AddOrderSuccess)).subscribe((data: any) => {
      this.cartitems = [];
      this.orderTotal = null;
      this.salesTax = null;
      this.subTotal = null;
      this.notifierService.notify("success", "Order placed successfully");
      this.router.navigate(["/orders"], { queryParams: { id: data.payload.invoiceNumber } });
    });


  }
}
