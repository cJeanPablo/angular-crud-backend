import { Product } from "./../product.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"],
})
export class ProductEditComponent implements OnInit {
  product: Product = {
    mes: "",
    projeto: "",
    dia: 0,
    atividade: "",
    atividadeDetalhe: "",
    horas: ""
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    });
  }

  editProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Produto alterado!"),
        this.router.navigate(["products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
