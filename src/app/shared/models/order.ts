import { Cart } from "./cart";

export class Order {
    invoiceTo: string;
    invoiceNumber: Number;
    invoiceDate: Date;
    dueDate: Date;
    salesTax: number;
    subTotal: number;
    orderTotal: number;
    cartItimes: Cart[];
}
