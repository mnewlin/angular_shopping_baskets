import { Product } from "./product";

export class Cart {
    id: symbol;
    product: Product;
    quantity: number;
    salesTax: number;
    totalPrice: number;
    importTaxPer: number;
    salesTaxPer: number;
    priceWithTax: number;
}

