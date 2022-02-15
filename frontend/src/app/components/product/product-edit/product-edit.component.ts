import { Product } from './../product.model';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product : Product = {
    name: '',
    price: 0.0
  }

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }

  edit() : void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Produto alterado!"),
      this.router.navigate(['products'])
    })
  }

}
