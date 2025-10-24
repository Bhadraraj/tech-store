import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { EnquiriesComponent } from './components/enquiries/enquiries.component';
import { StorageDemoComponent } from './components/storage-demo/storage-demo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'enquiries', component: EnquiriesComponent },
  { path: 'storage-demo', component: StorageDemoComponent },
  { path: '**', redirectTo: '' }
];
