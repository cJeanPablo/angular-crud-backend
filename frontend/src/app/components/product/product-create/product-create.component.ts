import { Product } from './../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, Optional } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  days: number[] = [];
  horas: number[] = [];
  product: Product = {
    mes: "",
    projeto: "",
    atividade: '',
    atividadeDetalhe: '',
    horas: '',
    dia: 0
  }


  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    const mesesCom31Dias = ['Janeiro', 'Marco', 'Maio', 'Julho', 'Agosto', 'Outubro', 'Dezembro'];
    const mesesCom30Dias = ['Abril', 'Junho', 'Setembro', 'Novembro'];
    const fevereiro = ['Fevereiro'];
    let mesSelecionado = this.route.snapshot.paramMap.get("mes");
    mesSelecionado = mesSelecionado.charAt(0).toUpperCase() + mesSelecionado.slice(1);
    let quantidadeDias = 0;
    if (mesesCom31Dias.includes(mesSelecionado)) {
      quantidadeDias = 31;
    } else if (mesesCom30Dias.includes(mesSelecionado)) {
      quantidadeDias = 30
    } else if (fevereiro.includes(mesSelecionado)) {
      quantidadeDias = 29;
    }
      for (let i = 1; i <= quantidadeDias; i++) {
        this.days.push(i);
      }
      for (let i = 1; i  <= 8; i++){
        this.horas.push(i);
      }
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("mes");
    id = id.charAt(0).toUpperCase() + id.slice(1);
    this.product.mes = id;

  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado!')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}

