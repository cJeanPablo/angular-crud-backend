import { HeaderService } from './../../components/template/header/header.service';
import { Component, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductReadComponent } from 'src/app/components/product/product-read/product-read.component';
import { ProductService } from 'src/app/components/product/product.service';

@Component({
  selector: "app-product-crud",
  templateUrl: "./product-crud.component.html",
  styleUrls: ["./product-crud.component.css"],
})
export class ProductCrudComponent implements OnInit {
  productReadComponent!: ProductReadComponent;
  options = [
    { value: 'janeiro', viewValue: 'Janeiro' },
    { value: 'fevereiro', viewValue: 'Fevereiro' },
    { value: 'marco', viewValue: 'Março' },
    { value: 'abril', viewValue: 'Abril' },
    { value: 'maio', viewValue: 'Maio' },
    { value: 'junho', viewValue: 'Junho' },
  ];
  selected = '';
  onSelectionChange(event: any) {
    console.log("Valor selecionado:", event.value);
    this.selected = event.value;
    this.productService.setFilter(event.value);
    
    
  }
  constructor(private router: Router,
    private headerService : HeaderService,
    private productService: ProductService) {
    headerService.headerData = {
      title: 'Cadastro de Atividades',
      icon: 'list_alt',
      routeUrl: '/products'
    }
   }

  ngOnInit(): void {
    this.productReadComponent = new ProductReadComponent(this.productService, this.router);
  }

  navigateToProductCreate(event: any) {
    if (this.selected === ''){
      this.productService.showMessage('Selecione um mês para adicionar uma atividade!')
    }
    this.router.navigate(['/products/create/' + this.selected])
  }
}
