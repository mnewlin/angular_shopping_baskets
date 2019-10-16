import { Product } from "./product";

export class Cart {
    product: Product;
    quantity: number;
    salesTax: number;
    totalPrice: number;
    importTaxPer: number;
    salesTaxPer: number;
    priceWithTax: number;
}

