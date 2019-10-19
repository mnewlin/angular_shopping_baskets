import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import * as order from "../actions/orders.actions";
import { switchMap, map } from "rxjs/operators";
import { OrderService } from "../shared/service/order.service";
@Injectable()
export class OrdersEffects {
    @Effect()
    get$: Observable<Action> = this.actions$.pipe(
        ofType(order.ActionTypes.Getlist),
        switchMap(() =>
            this.orderService
                .getAllOrders()
                .pipe(map(data => new order.GetOrderListCompleted(data)))
        )
    );

    constructor(
        private orderService: OrderService,
        private actions$: Actions
    ) { }
}
