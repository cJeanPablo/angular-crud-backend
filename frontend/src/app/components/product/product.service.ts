import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { BehaviorSubject, catchError, EMPTY, map, Observable, switchMap } from 'rxjs';
import { Portal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  getFilterProducts(): Observable<Product[]> {
    return this.filterSubject.pipe(
      switchMap(() => this.getFilteredProducts())
    );
  }

  setFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  getFilteredProducts(): Observable<Product[]> {
    let month = this.filterSubject.value;
    month = month.charAt(0).toUpperCase() + month.slice(1);
    const url = `${this.baseUrl}?mes=${month}`
    return this.http.get<Product[]>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }


  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readByMonth(month: string): Observable<Product[]> {
    month = month.charAt(0).toUpperCase() + month.slice(1);
    const url = `${this.baseUrl}?mes=${month}`
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    console.log(e)
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }
}
