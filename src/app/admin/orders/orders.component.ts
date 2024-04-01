import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  constructor(private order: CartService, private router: Router) { }

  orders: any[] = [];

  ngOnInit() {
    this.get()
  }

  get() {

    this.order.getAllFrames().subscribe(frames => { this.orders = frames.orders; console.log(frames) });
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


          this.get()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });


        });
      }
    });
  }

}
