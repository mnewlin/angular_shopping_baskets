
import * as fromProduct from "./product.reducer";
import * as fromOrders from "./orders.reducer";
import * as fromOrder from "./order.reducer";

import { Product } from "../shared/models/product";
import { Order } from "../shared/models/order";

export interface IState {
    products: Product[];
    orders: Order[];
    selectOrder: Order;
}

export const reducers:any = {
    products: fromProduct.reducer,
    orders: fromOrders.reducer,
    selectOrder:fromOrder.reducer
};
// tslint:disable-next-line: typedef
export const getProducts = (state: IState) => state.products;
// tslint:disable-next-line: typedef
export const getorders = (state: IState) => state.orders;


