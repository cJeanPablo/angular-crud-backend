import { Router } from '@angular/router';
import { ProductService } from "./../product.service";
import { Product } from "./../product.model";

import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.css"],
})
export class ProductReadComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = ["id", "mes", "projeto", "dia", "atividade", "atividadeDetalhe","horas", "actions"];
  products$!: Observable<Product[]>;

  constructor(private productService: ProductService,
    private router: Router) {}

  ngOnInit(): void {
    this.productService.getFilterProducts().subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }

  readByMonth(month : string) : void {
    this.productService.readByMonth(month).subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }

  navigateToProductDelete() : void {
    this.router.navigate(['/products/delete'])
  }

  navigateToProductEdit() : void {
    this.router.navigate(['/products/edit'])
  }
}
