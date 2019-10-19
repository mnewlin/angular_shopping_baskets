/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ShoppingcartComponent } from "./shoppingcart.component";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { NotifierModule } from "angular-notifier";
import { ProductService } from "../shared/service/product.service";

describe("ShoppingcartComponent", () => {
  let component: ShoppingcartComponent;
  let fixture: ComponentFixture<ShoppingcartComponent>;
  let service: ProductService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientModule, NotifierModule
      ],
      providers: [ProductService],
      declarations: [ShoppingcartComponent]
    })
      .compileComponents();
    service = TestBed.get(ProductService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should clicked add product", () => {
    spyOn(component, "addProduct");
    // tslint:disable-next-line: typedef
    let button = fixture.debugElement.nativeElement.querySelector(".addproduct");
    button.click();

    fixture.whenStable().then(() => {
      expect(component.addProduct).toHaveBeenCalled();
    });
  });

  it("should select product", async () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.products.length).toBeGreaterThan(0);
      // tslint:disable-next-line: typedef
      let select = fixture.debugElement.query(By.css(".productSelect")).nativeElement as HTMLSelectElement;
      fixture.detectChanges();
      select.selectedIndex = 1;
      select.dispatchEvent(new Event("change"));
      fixture.detectChanges();
      // tslint:disable-next-line: typedef
      let el = fixture.debugElement.query(By.css(".productprice")).nativeElement;
      expect(el.innerHTML).toContain(component.selectedProduct.price);
      // tslint:disable-next-line: typedef
      let qtyTextbox = fixture.debugElement.query(By.css(".qtyTextbox")).nativeElement as HTMLInputElement;
      qtyTextbox.value = "2";
      qtyTextbox.dispatchEvent(new Event("change"));
      fixture.detectChanges();
      expect(el.innerHTML).toContain(component.selectedProduct.price * 2);
    });
  });
});
