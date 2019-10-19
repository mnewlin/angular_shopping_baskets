import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { products } from "../products";
import { Order } from "../shared/models/order";
import { filter } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromRoot from "../reducers";
import { GetOrderList } from "../actions/orders.actions";
import * as fromActions from "../actions/order.actions";
import { ofType, Actions } from "@ngrx/effects";


@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  products = products;
  order: Order;

  orderList: Order[] = [];
  constructor(
    public store: Store<fromRoot.IState>,
    private _actions$: Actions,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams
      .pipe(filter(params => params.id))
      .subscribe(params => {
        if (params) {
          this.onChange(params.id);
        }
      });
    this.store.dispatch(new GetOrderList());
    this.store.select(fromRoot.getorders).subscribe(k => this.orderList = k);
  }
  onChange(value: string): void {
    this.store.dispatch(new fromActions.GetOrderByid(Number(value)));
    this._actions$.pipe(ofType(fromActions.ActionTypes.GetOderByidSuccess)).subscribe((data: any) => {
      this.order = data.payload;
    });
  }

}


