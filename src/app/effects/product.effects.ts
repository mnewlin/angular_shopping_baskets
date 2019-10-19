import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";

import * as product from "../actions/product.actions";
import { switchMap, map } from "rxjs/operators";
import { ProductService } from "../shared/service/product.service";
@Injectable()
export class ProductEffects {
    @Effect()
    get$: Observable<Action> = this.actions$.pipe(
        ofType(product.ActionTypes.Getlist),
        switchMap(() =>
            this.productService
                .getAllProducts()
                .pipe(map(data => new product.GetProductListCompleted(data)))
        )
    );


    constructor(
        private productService: ProductService,
        private actions$: Actions
    ) { }
}
