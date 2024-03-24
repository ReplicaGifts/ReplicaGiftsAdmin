import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  showOutOfStock = false;
  products: Product[] = [];
  filter = ""
  filteredProducts: Product[] = [];
  category: any = []

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private Category: CategoryService) { }

  getData() {

    this.Category.getCategory().subscribe(c => { this.category = c })

    if (this.showOutOfStock) {
      this.productService.fetchOutOfStock().subscribe(data => {
        this.products = data;
        this.filteredProducts = [...this.products]
      });
    } else {
      this.productService.get().subscribe((data: Product[]) => {
        this.products = data;
        this.filteredProducts = [...this.products]
      });
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.showOutOfStock = params['outOfStock'] === 'true';
      console.log(params['outOfStock']);
    });

    this.getData();

  }

  deleteProduct(id: any) {
    this.productService.delete(id).subscribe(data => {
      console.log(data);
      this.getData();
    });
  }

  edit(id: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        edit: id
      }
    };
    this.router.navigate(['/admin', 'product-manipulate'], navigationExtras);
  }
  filterProduct() {

    if (this.filter === ' ') {
      this.filteredProducts = this.products;
    }
    this.filteredProducts = this.products.filter(p => p.title.toLowerCase().includes(this.filter.toLowerCase()));

  }

  filterByCategory(category: any) {

    this.filteredProducts = this.products.filter(p => p.availablePrintType.includes(category.toString())) || [];

  }

  nav(id: any) {
    this.router.navigateByUrl("/product/" + id)
  }

}
