import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import * as order from "../actions/order.actions";
import { map, mergeMap } from "rxjs/operators";
import { OrderService } from "../shared/service/order.service";
@Injectable()
export class OrderEffects {
    @Effect()
    add$: Observable<Action> = this.actions$.pipe(
        ofType<order.AddOrderAction>(order.ActionTypes.AddOrder),
        map(action => action.payload),
        mergeMap(orderResponce =>
            this.orderService.createOrder(orderResponce)
                .pipe(map(res => new order.AddOrderSuccessAction(res)))

        )
    );
    @Effect()
    get$: Observable<Action> = this.actions$.pipe(
        ofType<order.GetOrderByid>(order.ActionTypes.GetOrderByid),
        map(action => action.payload),
        mergeMap(getOrder =>
            this.orderService.getOrderById(getOrder)
                .pipe(map(res => new order.GetOrderByidSuccess(res)))

        )
    );

    constructor(
        private orderService: OrderService,
        private actions$: Actions
    ) { }
}
