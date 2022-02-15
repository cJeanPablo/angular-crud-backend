import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductCreateComponent } from "./components/product/product-create/product-create.component";
import { ProductCrudComponent } from "./views/product-crud/product-crud.component";
import { HomeComponent } from "./views/home/home.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "products",
    component: ProductCrudComponent,
  },
  {
    path: "products/create",
    component: ProductCreateComponent,
  },
  {
    path: "products/delete/:id",
    component: ProductDeleteComponent
  },
  {
    path: "products/edit/:id",
    component: ProductEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
