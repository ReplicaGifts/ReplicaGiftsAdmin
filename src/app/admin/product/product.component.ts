import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { ProductViewComponent } from '../product-view/product-view.component';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductViewComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  constructor(private product: ProductService, private category: CategoryService, private route: ActivatedRoute, private router: Router) { }
  data: Product = {
    title: '',
    description: '',
    price: 0,
    discount: 0,

    userImage: false,
    image: "",

    additionalInfo: [{
      title: '',
      description: ''
    }],
    quantity: 1,

    availablePrintSize: [{
      width: 0,
      height: 1
    }],

    availablePrintType: [""],
    category: ''
  }



  categories: any[] = [];
  printType: any[] = [];

  ngOnInit() {

    this.category.getCategory().subscribe((data: any) => {
      this.categories = data;
      this.printType = data.filter((c: any) => c.printType);
      console.log(data)
    });


    this.get()



  }

  get() {
    this.product.get().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  showUpdate: any = false;

  products: any[] = [];


  addThub(e: any) {
    console.log(e);
    this.data.image = e.target.files[0];
  }




  trackByFn(index: any, item: any) {
    return index;
  }






  delete(id: any) {
    console.log(id);
    this.product.delete(id).subscribe(data => console.log(data));
  }


  idToUpdate: any;



  update() {

    this.product.edit(this.data, this.idToUpdate).subscribe(data => { console.log(data); this.get() })

  }

  close() {
    this.router.navigate(['admin']);
  }

  submit() {

    console.log(this.data)
    this.product.addProduct(this.data).subscribe(data => console.log(data));
  }

  edit(data: any) {
    this.data = data;
    this.showUpdate = true;
    this.idToUpdate = data._id;
  }


  deleteProduct(id: any) {
    this.product.delete(id).subscribe(data => {
      console.log(data);
      this.get()
    });
  }

}
