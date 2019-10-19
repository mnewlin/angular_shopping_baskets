import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxPrintModule } from "ngx-print";
import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { HttpClientModule } from "@angular/common/http";
import { ShoppingcartComponent } from "./shoppingcart/shoppingcart.component";
import { NotifierModule } from "angular-notifier";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./reducers";
import { EffectsModule } from "@ngrx/effects";
import { ProductEffects } from "./effects/product.effects";
import { OrdersEffects } from "./effects/orders.effects";
import { OrderEffects } from "./effects/order.effects";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NotifierModule.withConfig({
      position: {

        horizontal: {
          position: "right",
          distance: 12
        },
        vertical: {
          position: "top",
          distance: 12,
          gap: 10
        }

      }
    }),
    HttpClientModule,
    RouterModule.forRoot([
      { path: "orders", component: ProductListComponent },
      { path: "", component: ShoppingcartComponent }
    ]),
    NgxPrintModule,
    StoreModule.forRoot(reducers),

    EffectsModule.forRoot([ProductEffects,OrdersEffects,OrderEffects])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ShoppingcartComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


