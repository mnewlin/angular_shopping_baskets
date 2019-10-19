import * as product from "../actions/orders.actions";
// tslint:disable-next-line: typedef
export function reducer(state:[] = [], action: product.Actions) {
    switch (action.type) {
        case product.ActionTypes.GetlistCompleted:
            return action.payload;
        default:
            return state;
    }
}