import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable } from 'rxjs';
import { Portal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string) : void {
      this.snackBar.open(msg, 'x', {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top"
      })
  }

  create(product: Product) : Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
  }

  read() : Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }
  delete(product: Product) : Observable<Product> {
    return this.http.delete<Product>(this.baseUrl)
  }

  update(product: Product) : Observable<Product> {
    return this.http.put<Product>(this.baseUrl, product)
  }

}
