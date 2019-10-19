import * as product from "../actions/product.actions";
// tslint:disable-next-line: typedef
export function reducer(state:[] = [], action: product.GetProductListCompleted) {
    switch (action.type) {
        case product.ActionTypes.GetlistCompleted:
            return action.payload;
        default:
            return state;
    }
}