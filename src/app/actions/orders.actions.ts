import { Action } from "@ngrx/store";
import { Order } from "../shared/models/order";

export enum ActionTypes {
    Getlist = "GetOrderList",
    GetlistCompleted = "GetOrderListCompleted"

}
export class GetOrderList implements Action {
    readonly type = ActionTypes.Getlist;
}
export class GetOrderListCompleted implements Action {
    readonly type = ActionTypes.GetlistCompleted;
    constructor(public payload: Order[]) { }
}

export type Actions =
    GetOrderListCompleted |
    GetOrderList ;
