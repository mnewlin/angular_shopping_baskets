import * as product from "../actions/order.actions";
// tslint:disable-next-line: typedef
export function reducer(state:[] = [], action: product.Actions) {
    switch (action.type) {
        case product.ActionTypes.AddOrder:
            return action.payload;
        case product.ActionTypes.GetOrderByid:
            return action.payload;
        default:
            return state;
    }
}