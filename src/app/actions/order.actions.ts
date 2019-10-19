import { Action } from "@ngrx/store";
import { Order } from "../shared/models/order";

export enum ActionTypes {
    AddOrder = "AddOrderAction",
    AddOrderSuccess = "AddOrderSuccess",
    AddOrderFailed = "AddOrderFailed",
    GetOrderByid = "GetOrderByid",
    GetOderByidSuccess = "GetOrderByidSuccess"
}

export class AddOrderAction implements Action {
    readonly type = ActionTypes.AddOrder;

    constructor(public payload: Order) { }
}
export class AddOrderSuccessAction implements Action {
    readonly type = ActionTypes.AddOrderSuccess;
    constructor(public payload: Order) { }
}
export class AddOrderFailureAction implements Action {
    readonly type = ActionTypes.AddOrderFailed;
    constructor(public payload: any) { }
}
export class GetOrderByid implements Action {
    readonly type = ActionTypes.GetOrderByid;

    constructor(public payload: number) { }
}
export class GetOrderByidSuccess implements Action {
    readonly type = ActionTypes.GetOderByidSuccess;

    constructor(public payload: Order) { }
}
export type Actions =
    AddOrderAction | AddOrderSuccessAction | AddOrderFailureAction | GetOrderByid | GetOrderByidSuccess;