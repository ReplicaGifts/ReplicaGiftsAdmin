import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RouterService } from '../../service/router.service';
import { FormsModule } from '@angular/forms';
import { OrderViewTableComponent } from '../order-view-table/order-view-table.component';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, UpperCasePipe, OrderViewTableComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  constructor(private order: CartService, private router: Router, private routerService: RouterService) { }


  totalOrders = 0;
  statusOptions = ['recent', 'viewed', 'succeeded'];
  orders: any[] = [];

  pagenation = {
    page: 1,
    limit: 30,
    status: this.statusOptions[0]
  }
  ngOnInit() {
    this.get()
    this.routerService.setRoute('order');

  }

  get() {

    this.order.filterOrder(this.pagenation).subscribe(frames => {
      this.orders = frames.orders;
      this.totalOrders = frames.count;

      console.log(frames)
    });
  }

  nav(id: any) {
    this.router.navigateByUrl(`/admin/order-view/${id}`);
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
        this.order.deleteF(id).subscribe((data: any) => {
          console.log(data);


          this.get();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });


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
