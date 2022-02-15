import { Product } from "./../product.model";
import { Router } from "@angular/router";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
  products: Product = {
    name: "PS4",
    price: 3000.99,
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(["/products"]);
  }

  delete(): void {
    this.productService.delete(this.products).subscribe(() => {
      this.productService.showMessage("Produto deletado!"),
        this.router.navigate(["/products"]);
    });
  }
}
