import { Action } from "@ngrx/store";
import { Product } from "../shared/models/product";

export enum ActionTypes {
    Getlist = "GetProductList",
    GetlistCompleted = "GetProductListCompleted"
}
export class GetProductList implements Action {
  readonly  type = ActionTypes.Getlist;
}
export class GetProductListCompleted implements Action {
    readonly type = ActionTypes.GetlistCompleted;
    constructor(public payload: Product[]) { }
}