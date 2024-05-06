import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';
import { Product } from '../../model/product.model';
import { ProductViewComponent } from '../product-view/product-view.component';
import Swal from 'sweetalert2';
import { RouterService } from '../../service/router.service';
import { toggleSidebar } from '../../../main';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductViewComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent {

  constructor(private product: ProductService, private category: CategoryService, private routerService: RouterService) { }
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

    availablePrintSize: [{
      width: 0,
      height: 1
    }],

    availablePrintType: [""],
    category: '',
    frame: ''

  }


  pagenation = {
    page: 1,
    limit: 20,
  }

  totalOrders = 0;

  selected_category: boolean = false;


  categories: any[] = [];
  printType: any[] = [];

  ngOnInit() {

    this.category.getCategory().subscribe((data: any) => {
      this.categories = data;
      this.printType = data.filter((c: any) => c.printType);
      console.log(data);
      this.get()
    });

    this.routerService.setRoute('product');
    toggleSidebar();
  }

  getSelectCategory() {
    this.categories.map((c: any) => {
      if (c._id.toString() === this.data.category) {
        this.selected_category = c.frame
      }
    })
  }


  get() {
    this.product.getFilter(this.pagenation).subscribe((data: any) => {
      this.products = data.product;
      this.totalOrders = data.totalProduct;
    });
  }

  showUpdate: any = false;

  products: any[] = [];


  addThub(e: any) {
    console.log(e);
    this.data.image = e.target.files[0];
  }


  addFrame(e: any) {
    console.log(e);
    this.data.frame = e.target.files[0];
  }


  trackByFn(index: any, item: any) {
    return index;
  }








  idToUpdate: any;



  update() {

    this.product.edit(this.data, this.idToUpdate).subscribe(data => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      this.get();
      this.close()
    })

  }

  close() {

    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      // Reset the file input
      fileInput.value = '';
    }

    this.showUpdate = false;
    this.data = {
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

      availablePrintSize: [{
        width: 0,
        height: 1,
        // price: 0,
      }],

      availablePrintType: [""],
      category: ''
    }
  }

  submit() {

    console.log(this.data)
    this.product.addProduct(this.data).subscribe(data => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product has been saved",
        showConfirmButton: false,
        timer: 1500
      });

      this.close();
    }
    );
  }

  edit(data: any) {
    this.data = data;
    this.showUpdate = true;
    this.idToUpdate = data._id;
    this.data.category = data.category._id;

    console.log(data)
  }


  deleteProduct(id: any) {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.product.delete(id).subscribe((data: any) => {
          console.log(data);

          if (data.success) {

            this.get()
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          } else {
            Swal.fire({
              title: "Warning!",
              text: data.message,
              icon: "warning"
            });
          }


        });
      }
    });
  }


  next() {
    if (this.pagenation.page * this.pagenation.limit < this.totalOrders) {
      ++this.pagenation.page;
      this.get();
    }

  }

  prev() {

    if (this.pagenation.page > 1) {
      --this.pagenation.page
      this.get();
    }

  }

}
